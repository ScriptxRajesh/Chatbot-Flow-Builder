import { AiOutlineMessage } from "react-icons/ai";
import { Handle, Position } from "reactflow";

const Message = ({ data }: any) => {
  return (
    <div className="min-w-[200px] max-w-[250px] rounded-md overflow-hidden shadow-xl">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#4a4a4a" }}
      />
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full text-[10px] bg-teal-200 px-2 py-1">
          <div className="flex gap-2 items-center">
            <AiOutlineMessage />
            <span className="font-bold">Send Message</span>
          </div>
          <div className="w-[15px] h-[15px] bg-white flex justify-center items-center rounded-full">
            <img
              src="https://1000logos.net/wp-content/uploads/2021/04/WhatsApp-logo.png"
              alt=""
            />
          </div>
        </div>
        <div className="bg-white px-2 py-1 text-[12px]">{data.label}</div>
      </div>
      <Handle
        type="source"
        id={data.id}
        position={Position.Right}
        style={{ background: "#4a4a4a" }}
      />
    </div>
  );
};

export default Message;
