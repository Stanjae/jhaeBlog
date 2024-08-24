'use client'

export const sluggifyText = (text: string | null) => {
  let finger = text?.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '')
  let june = finger?.trim();
  return june
};

/* export const sluggifyText = (text: string | null) => {
  const tell = text?.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
  return tell;
} */




export function removeHTMLTags(htmlString:any) {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string into a DOM document
    const doc = parser.parseFromString(htmlString, 'text/html');
    // Extract the text content from the parsed document
    const textContent = doc.body.textContent || "";
    const fixed = textContent.trim().slice(1, 200); // Trim any leading or trailing whitespace
    return fixed;
  }


  export const generatePagination =(currentPage:any, totalPages:any)=>{
    if(currentPage === 1) return [currentPage, currentPage + 1, currentPage + 2];

    if(currentPage === totalPages) return [currentPage - 2, currentPage - 1, currentPage];

    if(currentPage > 1) return [currentPage - 1, currentPage, currentPage + 1];
  }

