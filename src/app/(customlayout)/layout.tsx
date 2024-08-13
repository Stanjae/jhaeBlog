
import NavBar from "../ui/navigation/NavBar";
import FirstLayoutContainer from "../ui/layoutcontainers/FirstLayoutContainer";



export default async function FirstLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="h-screen" >
      <NavBar/>
      <FirstLayoutContainer>
        {children}
      </FirstLayoutContainer>
         
    </div>
  );
}
