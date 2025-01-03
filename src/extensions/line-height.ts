import { Extension } from "@tiptap/react";
declare module "@tiptap/core"{
    interface Commands<ReturnType>{
        LineHeight : {
            setLineHeight : (LineHeight : string) => ReturnType;
            unsetLineHeight : () => ReturnType;
        }
    }
}

export const LineHeightExtension = Extension.create({
    name : "LineHeight",
    addOptions() {
        return{
            types : ["paragraph","heading"],
            defaultLineHeight : "normal",
        }
    },
    addGlobalAttributes() {
        return [
            {
                types : this.options.types,
                attributes :{
                    LineHeight : {
                        default : this.options.defaultLineHeight,
                        renderHTML : attributes => {
                            if(!attributes.LineHeight ) return {}
                            return {
                                style : `Line-height: ${attributes.LineHeight}`,
                            }
                        },
                        parseHTML : element =>{
                            return element.style.lineHeight || this.options.defaultLineHeight
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return{
            setLineHeight : (LineHeight : string) => ({tr,state,dispatch}) =>{
                const {selection} =state;
                tr = tr.setSelection(selection);

                const {from,to} = selection;
                state.doc.nodesBetween(from,to,(node,pos) =>{
                    if(this.options.types.includes(node.type.name)){
                    tr = tr.setNodeMarkup(pos,undefined ,{
                        ...node.attrs,
                        LineHeight,
                    })
                }
                })

                if(dispatch) dispatch(tr)
                    return true;
            },
            unsetLineHeight : () => ({tr,state,dispatch}) =>{
                const {selection} = state;
                tr = tr.setSelection(selection);

                const {from,to} = selection;
                state.doc.nodesBetween(from,to,(node,pos) =>{
                    if(this.options.types.includes(node.type.name)){
                        tr = tr.setNodeMarkup(pos,undefined,{
                            ...node.attrs,
                            LineHeight : this.options.defaultLineHeight
                        })

                    }
                })
                if(dispatch) dispatch(tr)
                    return true;
            }
        }
    },
})