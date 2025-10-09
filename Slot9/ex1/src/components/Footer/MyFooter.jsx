import  Button from "react-bootstrap/Button";
import "./footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} MYVP. All rights reserved </p>
      <Button variant="link" href="https://github.com/vophammy24" >My Link Github: {linkGithub}</Button>
    </footer>
  )
}
export default MyFooter;