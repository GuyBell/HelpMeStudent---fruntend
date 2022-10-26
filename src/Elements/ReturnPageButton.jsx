import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

function ReturnPageButton({ GoTo }) {
  return (
    <button onClick={GoTo} style={{ transform: "rotateY(180deg)", background: "rgb(228, 233, 190, 0.6)", borderRadius: 50, border: "solid rgb(228, 233, 190) 1px", position: "fixed", top: "3%", right: "5%" }}>
      <ArrowBackSharpIcon />
    </button>
  );
}

export default ReturnPageButton;