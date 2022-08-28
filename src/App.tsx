import Container from "./components/Container";
import Header from "./components/Header";
import Scheduler from "./components/Scheduler";
import "./global.css";

export function App() {
  return (
    <Container>
      <Header />
      <Scheduler />
    </Container>
  );
}
