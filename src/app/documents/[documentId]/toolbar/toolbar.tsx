"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo, Undo2Icon } from "lucide-react";

const FontFamilyButton = () =>{
    const {editor} = useEditorStore();
    const font = [
        {label : "Arial", value : "Arial"},
        {label : "Times New Roman", value : "Times New Roman"},
        {label : "Courier New", value : "Courier New"},
        {label : "Georgia", value : "Georgia"},
        {label : "Verdana", value : "Verdana"},
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className=
                "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <span className="truncate">
              {editor?.getAttributes("textStyle").fontFamily || "Arial"}
              </span>
              <ChevronDownIcon  className="p-1 flex flex-col gap-y-1"/>
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex felx-col gap-y-1">
            {font.map(({label,value}) => (
                <button
                key={value}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                )}
                style={{fontFamily : value}}
                >

                </button>
            ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 

 interface ToolbarButtonProps{
    onClick? : () => void;
    isActive? : boolean;
    icon : LucideIcon;

 }

 const ToolbarButton = ({
    onClick,
    isActive,
    icon : Icon
 }: ToolbarButtonProps)=>{
return(
    <button onClick={onClick}
    className={cn(
        "text-sm min-h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-netural-200/80"
    )}
    >
        <Icon className="size-4"/>
    </button>
)
 }
 export const Toolbar = () => {
    const {editor}  = useEditorStore();
    console.log("eDITOR :",editor);
    const sections :
    {label:string;
    icon :LucideIcon;
    onClick: () => void;
    isActive? : boolean;
    }[][] = [
        [
            {
                label : "Undo",
                icon : Undo2Icon,
                onClick : () => editor?.chain().focus().undo().run(),
               
            },
            {
                label : "Redo",
                icon : Redo2Icon,
                onClick : () => editor?.chain().focus().redo().run()
            },
            {
                label : "Print",
                icon : PrinterIcon,
                onClick : () => window.print(),
            },
            {
                label : "Spell Check",
                icon : SpellCheckIcon,
                onClick() {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck",current === "false" ? "true" : "false")
                },
            }
        ],
        [
            {
                label : "Bold",
                icon : BoldIcon,
                isActive : editor?.isActive("bold"),
                onClick : () => editor?.chain().focus().toggleBold().run(),
                
            },
            {
                label : "Italic",
                icon : ItalicIcon,
                isActive : editor?.isActive("italic"),
                onClick : () => editor?.chain().focus().toggleItalic().run()
            },
            {
                label : "Underline",
                icon : UnderlineIcon,
                isActive : editor?.isActive("underline"),
                onClick : () => editor?.chain().focus().toggleUnderline().run()
            }
        ],
        [
            {
                label : "Comment",
                icon : MessageSquarePlusIcon,
                onClick : () => console.log("TODO : Comment"),
                isActive : false,
            },
            {
                label : "List Todo",
                icon : ListTodoIcon,
                onClick : () => editor?.chain().focus().toggleTaskList(),
                isActive : editor?.isActive("taskList"),
            },
            {
                label : "Remove formatting",
                icon : RemoveFormattingIcon,
                onClick : () => editor?.chain().focus().unsetAllMarks().run(),
                isActive : editor?.isActive("taskList"),
            }
        ]
    ];

    return ( 
        <div className="bg=[#F1F4F9] px-2.5 py-0.5 rounded-[24px] m-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) =>(
<ToolbarButton key={item.label} {...item}/>
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* Todo Font Family */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/*Todo Font Size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/*Todo heading */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) =>(
                <ToolbarButton  key={item.label} {...item}/>
            ))}
             {/* Todo text color */}
             {/* Todo highlight color */}
             <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* Todo link */}
            {/* Todo link */}
            {/* Todo link */}
            {/* Todo link */}
            {/* Todo link */}
            {sections[2].map((item) =>(
                <ToolbarButton  key={item.label} {...item}/>
            ))}
        </div>
     );
}
 
