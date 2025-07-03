import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import type { Connection } from "reactflow";
import "reactflow/dist/style.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar";
import MessageNode from "./nodes/Message";
import EditNode from "./EditNode";
import { NodeContext } from "../context/NodeContext";

type NodeData = {
  label: string;
};

type CustomNode = Node<NodeData>;

const initialNodes: CustomNode[] = [];

const nodeTypeConfig = {
  message: MessageNode,
};

const nodeIdCounters: Record<string, number> = {};

const initializeNodeCounters = (nodes: Node[]) => {
  nodes.forEach((node) => {
    const type = node.type;
    if (!type) return;
    if (!nodeIdCounters[type]) {
      nodeIdCounters[type] = 0;
    }
    const nodeIdNumber = parseInt(node.id.split("_").pop() || "0", 10);
    if (nodeIdNumber >= nodeIdCounters[type]) {
      nodeIdCounters[type] = nodeIdNumber + 1;
    }
  });
};

const getId = (type: string) => {
  if (!nodeIdCounters[type]) {
    nodeIdCounters[type] = 0;
  }
  return `${type}_node_${nodeIdCounters[type]++}`;
};

const ReactflowContainer: React.FC = () => {
  const {
    flowHaveChanges,
    setFlowHaveChanges,
    setFlowHaveErrors,
    toggleBtnClick,
    nodeSelected,
    setNodeSelected,
  } = useContext(NodeContext);

  const reactFlowContainer = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onNodeLabelChange = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label } }
            : node
        )
      );
      setFlowHaveChanges(true);
    },
    [setFlowHaveChanges, setNodes]
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setFlowHaveChanges(true);
      const existingEdge = edges.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (existingEdge) {
        toast.warn("Source handle already connected to an edge");
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges, setFlowHaveChanges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setFlowHaveChanges(true);

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!position) return;

      const newNode: CustomNode = {
        id: getId(type),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setFlowHaveChanges, setNodes]
  );

  const checkNodesWithoutEdges = useCallback(() => {
    const unconnectedNodes = nodes.filter((node) => {
      return !edges.some(
        (edge) => edge.source === node.id || edge.target === node.id
      );
    });

    if (unconnectedNodes.length > 0) {
      console.warn("Unconnected nodes found:", unconnectedNodes);
      return true;
    }
    return false;
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("flowKey", JSON.stringify(flow));
      setFlowHaveChanges(false);
      toast.success("Flow saved to localStorage");
    }
  }, [reactFlowInstance, setFlowHaveChanges]);

  const onSave = useCallback(() => {
    if (flowHaveChanges) {
      if (checkNodesWithoutEdges()) {
        setFlowHaveErrors(true);
        toast.error("There are unconnected nodes in the container");
      } else {
        setFlowHaveErrors(false);
        saveFlow();
      }
    }
  }, [
    flowHaveChanges,
    checkNodesWithoutEdges,
    saveFlow,
    setFlowHaveErrors,
  ]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setNodeSelected(node);
    },
    [setNodeSelected]
  );

  useEffect(() => {
    const savedFlow = localStorage.getItem("flowKey");
    if (savedFlow) {
      const flow = JSON.parse(savedFlow);
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        initializeNodeCounters(flow.nodes || []);
      }
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (toggleBtnClick || !toggleBtnClick) {
      onSave();
    }
  }, [toggleBtnClick]);

  useEffect(() => {
    if (nodeSelected) {
      onNodeLabelChange(nodeSelected.id, nodeSelected.data.label);
    }
  }, [nodeSelected, onNodeLabelChange]);

  return (
    <div className="flex flex-col md:flex-row flex-grow-1 h-full">
      <ReactFlowProvider>
        <div className="flex-grow-1 w-full flex-1" ref={reactFlowContainer}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypeConfig}
            fitView
          >
            <Controls />
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </div>
        <div className="border-t-2 md:border-l-2 md:border-t-0 w-96">
          {nodeSelected ? <EditNode /> : <Sidebar />}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactflowContainer;
