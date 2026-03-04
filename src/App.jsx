function AdminPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const [animeId, setAnimeId] = useState("")
  const [episodeTitle, setEpisodeTitle] = useState("")
  const [episodeNumber, setEpisodeNumber] = useState("")
  const [videoFile, setVideoFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5001/api/anime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          coverImage
        })
      })

      const data = await res.json()
      alert("Anime uploaded successfully")

      setTitle("")
      setDescription("")
      setCoverImage("")
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    }
  }

  const handleEpisodeUpload = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("anime", animeId)
    formData.append("title", episodeTitle)
    formData.append("episodeNumber", episodeNumber)
    formData.append("video", videoFile)

    try {
      const res = await fetch("http://localhost:5001/api/episodes", {
        method: "POST",
        body: formData
      })

      await res.json()
      alert("Episode uploaded successfully")

      setEpisodeTitle("")
      setEpisodeNumber("")
      setVideoFile(null)
    } catch (err) {
      console.error(err)
      alert("Episode upload failed")
    }
  }

  return (
    <div style={pageStyle}>
      <Navbar />

      <h1 style={{ marginTop: "40px" }}>Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "30px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <input
          type="text"
          placeholder="Anime Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Poster Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#39ff14",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Upload Anime
        </button>
      </form>

      <h2 style={{ marginTop: "40px" }}>Upload Episode</h2>

      <form
        onSubmit={handleEpisodeUpload}
        style={{
          marginTop: "20px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <input
          type="text"
          placeholder="Anime ID"
          value={animeId}
          onChange={(e) => setAnimeId(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Episode Title"
          value={episodeTitle}
          onChange={(e) => setEpisodeTitle(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="number"
          placeholder="Episode Number"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#39ff14",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Upload Episode Video
        </button>
      </form>
    </div>
  )
}
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"

const pageStyle = {
  background: "#050505",
  minHeight: "100vh",
  color: "#39ff14",
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  margin: 0,
  padding: 0
}

function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        padding: "15px 40px",
        background: "#0a0a0a",
        borderBottom: "1px solid #39ff14",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Link
        to="/"
        style={{
          color: "#39ff14",
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        ANIME STREAM
      </Link>

      <span style={{ color: "#39ff14", opacity: 0.7 }}>
        React · Node · Mongo
      </span>
    </div>
  )
}

function Home() {
  const [animeList, setAnimeList] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:5001/api/anime")
      .then(res => res.json())
      .then(data => setAnimeList(data))
  }, [])

  const demoAnime = [
    {
      _id: "jjk",
      title: "Jujutsu Kaisen",
      description: "Sorcerers fight cursed spirits threatening humanity.",
      coverImage:
        "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    },
    {
      _id: "mha",
      title: "My Hero Academia",
      description: "A powerless boy enrolls in a prestigious hero academy.",
      coverImage:
        "https://cdn.myanimelist.net/images/anime/10/78745.jpg"
    }
  ]

  const allAnime = [...animeList, ...demoAnime]
  const filteredAnime = allAnime.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={pageStyle}>
      <Navbar />
      <h2 style={{ marginLeft: "40px", marginTop: "20px" }}>Featured</h2>
      <div style={{ width: "100%", padding: "20px 40px" }}>
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #39ff14",
            background: "#000",
            color: "#39ff14"
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "420px",
          backgroundImage:
            "url(https://cdn.myanimelist.net/images/anime/10/47347.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "60px"
        }}
      >
        <div>
          <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>
            Attack on Titan
          </h1>

          <p style={{ maxWidth: "500px", marginBottom: "20px" }}>
            Humanity fights for survival against gigantic Titans that threaten their existence.
          </p>

          <Link
            to={`/anime/${animeList[0]?._id || ""}`}
            style={{
              background: "#39ff14",
              color: "#000",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            ▶ Watch Now
          </Link>
        </div>
      </div>

      <h2 style={{ marginLeft: "40px", marginTop: "20px" }}>Trending Anime</h2>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "30px",
          width: "100%",
          padding: "0 40px"
        }}
      >
        {filteredAnime.map(anime => (
          <Link
            key={anime._id}
            to={`/anime/${anime._id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                width: "260px",
                background: "#0f0f0f",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #39ff14",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform='scale(1.05)'
                e.currentTarget.style.boxShadow='0 0 15px #39ff14'
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform='scale(1)'
                e.currentTarget.style.boxShadow='none'
              }}
            >
              <img
                src={anime.coverImage || "https://cdn.myanimelist.net/images/anime/10/47347.jpg"}
                alt={anime.title}
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ color: "#39ff14" }}>{anime.title}</h3>
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      background: "#39ff14",
                      color: "#000",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      marginRight: "5px"
                    }}
                  >
                    Action
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      background: "#39ff14",
                      color: "#000",
                      padding: "3px 8px",
                      borderRadius: "4px"
                    }}
                  >
                    Anime
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "#9cff7a" }}>
                  {anime.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function AnimePage() {
  const { id } = useParams()
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5001/api/episodes/anime/${id}`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
  }, [id])

  return (
    <div style={pageStyle}>
      <Navbar />

      <h1 style={{ marginTop: "40px" }}>Episodes</h1>

      <div
        style={{
          marginTop: "30px",
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        {episodes.length === 0 && <p>No episodes found.</p>}

        {episodes.map(ep => (
          <div
            key={ep._id}
            style={{
              background: "#1a1a1a",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <img
              src="https://i.ytimg.com/vi/MGRm4IzK1SQ/maxresdefault.jpg"
              style={{ width: "100%", borderRadius: "6px", marginBottom: "10px" }}
            />
            <h3>
              Episode {ep.episodeNumber}: {ep.title}
            </h3>
            <div
              style={{
                height: "6px",
                width: "100%",
                background: "#333",
                borderRadius: "4px",
                marginTop: "6px",
                marginBottom: "10px"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "40%",
                  background: "#39ff14",
                  borderRadius: "4px"
                }}
              />
            </div>

            <Link to={`/watch/${ep._id}`} style={{ color: "#39ff14" }}>
              ▶ Watch Episode
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function WatchPage() {
  const { id } = useParams()

  return (
    <div style={pageStyle}>
      <Navbar />

      <h1 style={{ marginTop: "40px" }}>Watching Episode</h1>

      <video
        controls
        autoPlay
        style={{
          width: "80%",
          maxWidth: "1200px",
          marginTop: "30px",
          borderRadius: "10px"
        }}
      >
        <source
          src={`http://localhost:5001/api/episodes/watch/${id}`}
          type="video/mp4"
        />
      </video>

      <Link
        to="/"
        style={{ marginTop: "20px", color: "#39ff14", textDecoration: "none" }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App