import { useParams } from "react-router-dom";

export default function Chat() {
  const { id } = useParams();

  return (
    <>
      <h2>What an amazing chat! Received from { id }</h2>
    </>
  )
}