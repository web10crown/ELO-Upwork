import { useEffect, useState } from "react";
import publicRequest from "./utils/request";
import axios from "axios";
function App() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [win, setWin] = useState(false);
  const[uData,setUData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${publicRequest}/ratings`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRatings = async (e)=>{
    const data = {
      winner: e.target.name,
      loser: e.target.name === "player1" ? "player2":"player1"
    };
    try{
      const res = await axios.post(`${publicRequest}/update-ratings`,data);
      setUData(res.data);
      setWin(true);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
      <div>
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <h5 className="text-white h4">Hope u find it insightfull</h5>
            <span className="text-muted">Make sure to give some feedback</span>
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>

      <div className="container">
        {loading ? (
          <div className="spinner-border text-primary my-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="alert alert-success my-4" role="alert">
            Backend connected successfully!
          </div>
        )
        }
        <h1 className="heading my-3">Description</h1>
        <p className="mb-5">Welcome to our MERN stack web application! Our platform utilizes the Elo rating system to provide players with specific ratings based on their performance and victories. This example application showcases the fundamental functionality of the Elo rating system within a gaming context. However, i have the expertise to enhance and expand the features of this application to suit various needs and requirements. Whether it's additional functionality, customization, or integration with other systems, i'm here to deliver a tailored solution that meets your specific goals.</p>
        <h1 className="heading my-5">Initial Ratings</h1>
        {loading ? (
          <div className="spinner-border text-primary my-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Ratings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Player1</td>
                <td>{data.players.player1}</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Player2</td>
                <td>{data.players.player2}</td>
              </tr>
            </tbody>
          </table>
        )}
        <h1 className="heading my-5">Choose a player to win</h1>
        {!win ? (
          <>
            <button type="button" name="player1" className="btn btn-primary btn-lg mr-5" onClick={handleRatings} >Player 1</button>
            <button type="button" name="player2" className="btn btn-secondary btn-lg" onClick={handleRatings}>Player 2</button>
          </>)
          : (
            <div className="alert alert-primary" role="alert">
              Hurray! check the updated ratings!
            </div>
          )}

        {win ? (
          <>
            <h1 className="heading my-5 text-success">Ratings after win</h1>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Ratings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Player1</td>
                  <td>{uData.players.player1}</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Player2</td>
                  <td>{uData.players.player2}</td>
                </tr>
              </tbody>
            </table>
            <p className="my-5 text-danger">Please refresh the page for another winner</p>
          </>
        ) : (<p className="my-4 text-primary">Ratings will apear here after update</p>)}

      </div>
    </div>
  );
}

export default App;
