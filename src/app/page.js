import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Navbar />
      <Form />
    </div>
  );
}
