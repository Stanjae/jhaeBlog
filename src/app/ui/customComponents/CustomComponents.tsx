"use client";
 
import { ThemeProvider, Button, Input,  Select, Option,  Checkbox, Alert, Avatar,
    Card, List, ListItem, ListItemPrefix, Typography, CardHeader, CardBody, Chip, 
    CardFooter,IconButton, Tooltip, Dialog, DialogHeader, DialogBody,DialogFooter, Popover,
    PopoverHandler,PopoverContent,
    } from "@material-tailwind/react";



 

    const tags = [{
        label: "#tech", value: "tech"}, 
        {label:'Vue.js', value:'vue.js'}, {label:'Angular.js', value:'angular.js'}, 
    {label:'Svelte.js', value:'svelte.js'}]


   
  export function CheckboxList({setTags}:{setTags:any}) {

    const handleChecked =(e:any)=>{
        const {name, checked} = e.target;
        if(checked){
            setTags((prevArry:string[])=> ([...prevArry, name]));
        }else{
            setTags((prevArry:string[])=> prevArry.filter((item:any)=> item !== name));
        }
    }

    return (
      <Card className="w-full">
        <Typography variant="paragraph" className="font-light ml-4 pt-1.5 text-xs">
          Tags (optional)
        </Typography>
        <List className="flex-row">
        {tags.map((tag) => (
           
          <ListItem key={tag.label} className="p-0">
            <label
              htmlFor="horizontal-list-react"
              className="flex w-full cursor-pointer items-center p-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  ripple={false}
                  name={tag.label}
                  onChange={(e) => handleChecked(e)}
                  crossOrigin={"anonymous"}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {tag.label}
              </Typography>
            </label>
          </ListItem>
           ))}
        </List>
      </Card>
    );
  }

  export function CheckboxListEdited({setTags, tagss}:{setTags:any, tagss:any}) {
   
    const handleChecked =(e:any)=>{
        const {name, checked} = e.target;
        if(checked){
            setTags((prevArry:string[])=> ([...prevArry, name]));
        }else{
            setTags((prevArry:string[])=> prevArry.filter((item:any)=> item !== name));
        }
    }

    return (
      <Card className="w-full">
        <Typography variant="paragraph" className="font-light ml-4 pt-1.5 text-xs">
          Tags (optional)
        </Typography>
        <List className="flex-row">
        {tags.map((tag) => (
           
          <ListItem key={tag.label} className="p-0">
            <label
              htmlFor="horizontal-list-react"
              className="flex w-full cursor-pointer items-center p-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  ripple={false}
                  name={tag.label}
                  onChange={(e) => handleChecked(e)}
                  crossOrigin={"anonymous"}
                  checked={tagss.includes(tag.label)}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {tag.label}
              </Typography>
            </label>
          </ListItem>
           ))}
        </List>
      </Card>
    );
  }



const CustomFileUpload =()=>{
    return(
        <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
</div> 
    )
}

export { ThemeProvider, Button, Input, CustomFileUpload , Alert,  Select, Option, Typography, Avatar,
  CardHeader, CardBody, Chip, CardFooter, IconButton,Tooltip, Card, Dialog,
  DialogHeader,DialogBody,DialogFooter, Popover,
  PopoverHandler,
  PopoverContent
}