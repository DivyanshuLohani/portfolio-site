import { Code2, Package, Gamepad2 } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="sticky top-0 flex md:px-10 border-b border-[#ffffff44] backdrop-blur-sm z-10 justify-between items-center">
      <a
        href="/"
        className="text-lg md:text-xl flex items-center gap-2 hover:bg-white/10 px-2 md:p-5"
      >
        <Code2 size={25} />
        Divyanshu Lohani
      </a>
      <div onClick={() => setOpen(!open)} className="md:hidden">
        <span className="w-5 h-2"></span>
        <span className="w-5 h-2"></span>
        <span className="w-5 h-2"></span>
      </div>
      <ul className="flex items-center p-0">
        <li className="p-0">
          <a
            href="/projects"
            className="flex items-center gap-2 hover:bg-white/10 cursor-pointer p-5"
          >
            <Package size={18} />
            Projects
          </a>
        </li>
        <li className="p-0">
          <a
            href="/experience"
            className="flex items-center gap-2 hover:bg-white/10 cursor-pointer p-5"
          >
            <Gamepad2 size={18} />
            Skills
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
