import React, { useContext } from "react";
import { NodeContext } from "../context/NodeContext";
import { Nodes } from  "../data/Nodes";

const Sidebar = () => {
  const { setFlowHaveChanges } = useContext(NodeContext);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setFlowHaveChanges(true);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-full md:max-w-[350px] px-5">
      <div className="w-full border-b-[1px] px-3 py-3 text-[16px] font-bold text-blue-800">
        Available Nodes
      </div>
      <div className="mt-5 flex justify-between flex-wrap gap-5">
        {Nodes.map((node) => {
          const IconComponent = node.icon;
          return (
            <div
              key={node.id}
              className="flex flex-1 justify-center items-center flex-col max-w-[150px] border-[1px] border-blue-800 px-5 py-5 rounded-md cursor-pointer"
              onDragStart={(event) =>
                onDragStart(event, node.title.toLowerCase())
              }
              draggable
            >
              <IconComponent className="text-[20px] text-blue-800" />
              <span className="text-[14px] font-bold text-blue-800">
                {node.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-5 text-[14px] text-gray-500">
        Note: You can drag and drop these nodes to create your flow.
      </div>
    </aside>
  );
};

export default Sidebar;
