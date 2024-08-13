'use client'
import React, {useState, useEffect } from 'react'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

// Import all Froala Editor plugins;
import 'froala-editor/js/plugins.pkgd.min.js';
import { useDebounce } from '@/app/hooks/useDebounce';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';


// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
// import 'font-awesome/css/font-awesome.css';
// import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';


const config={
    documentReady: true,
    heightMin: 500,
    placeholderText: 'Create a Beautiful Story!',
    events : {
        'focus' : function(e:any, editor:any) {
          //console.log(`${editor.selection.get()}`);
        }
    },
    charCounterCount: false
  }



const FroalaRichTextEdited = ({content}:any) => {
    const [model,setModel] = useState<any>("");

    const debouncedValue = useDebounce(model, 500)

    
    useEffect(() => {
       // setModel(JSON.parse(content || ""))
      const storedValue = sessionStorage.getItem("editor");
      
      if(!storedValue){
        sessionStorage.setItem("editor", content)
      }else{
        setModel(JSON.parse(content || ""));
      } 
    }, []);

    useEffect(() => {
        if (debouncedValue) {
          sessionStorage.setItem('editor', JSON.stringify(debouncedValue))
      }
    },[debouncedValue])
    
    const handleModelChange= (event:any)=>{
        setModel(event)
      }
  return (
    <div id='editor'>
      <FroalaEditorComponent model={model} onModelChange={handleModelChange} config={config} tag='textarea'/>
    </div>
  )
}

export default FroalaRichTextEdited
