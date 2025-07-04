import React, { useContext, useEffect } from "react";
import { NodeContext } from "../context/NodeContext";
import { IoArrowBack } from "react-icons/io5";
import type { Node } from "reactflow";

const EditNode = () => {
  const { nodeSelected, setNodeSelected, setFlowHaveChanges } = useContext(NodeContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedLabel = e.target.value;
    setNodeSelected((prevNode: Node) => ({
      ...prevNode,
      data: { ...prevNode.data, label: updatedLabel },
    }));
  };
   useEffect(() => {
    setFlowHaveChanges(true);
  }, [nodeSelected, setFlowHaveChanges]);

  return (
    <aside className="w-full">
      <div className="w-full border-b-[1px] px-5 py-3 flex justify-start items-center">
        <div className="cursor-pointer" onClick={() => setNodeSelected(null)}>
          <IoArrowBack />
        </div>
        <div className="flex-1 text-center">Message</div>
      </div>
      <div className="px-5 py-5 border-b-[1px] ">
        <p className="mb-5">Text</p>
        <textarea
          name="text"
          className="w-full border-[1px]"
          rows={5}
          cols={30}
          value={nodeSelected?.data.label}
          onChange={handleChange}
        ></textarea>
      </div>
    </aside>
  );
};

export default EditNode;
