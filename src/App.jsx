// Skeleton loader animation style for Brick 55
const skeletonStyle = document.createElement("style")
skeletonStyle.innerHTML = `
@keyframes pulse {
  0% { opacity: 0.5 }
  50% { opacity: 1 }
  100% { opacity: 0.5 }
}`
document.head.appendChild(skeletonStyle)
// BRICK 57 - default SEO title
document.title = "Anime Stream | Watch Anime Online"
import React, { useEffect, useState } from "react"
// BRICK 59 - production API endpoint support
const API = import.meta.env.VITE_API_URL || "http://localhost:5001"

const theme = {
  bg: "#050505",
  card: "#0f0f0f",
  border: "#1f1f1f",
  neon: "#39ff14",
  text: "#e5ffe5",
  subText: "#9cff7a",
  accent: "#00ffcc"
}


import { HashRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("UI Crash:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: "#050505",
            color: "#39ff14",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <h1>Something went wrong</h1>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              background: "#39ff14",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Reload App
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// BRICK 21 - auth helper
const getToken = () => localStorage.getItem("auth-token")

const pageStyle = {
  background: "#050505",
  minHeight: "100vh",
  color: "#39ff14",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: 0,
  padding: 0,
  overflowX: "hidden",
  boxSizing: "border-box"
}

const container = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 20px",
  width: "100%",
  boxSizing: "border-box"
}

const Footer = React.memo(function Footer() {
  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #39ff14",
        background: "#0a0a0a",
        color: "#39ff14",
        fontSize: "14px"
      }}
    >
      Anime Stream • React + Node + Mongo • Built by Arya
    </div>
  )
})

const Navbar = React.memo(function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        padding: "12px 20px",
        boxSizing: "border-box",
        background: "rgba(10,10,10,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Link
        to="/"
        style={{
          color: theme.neon,
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        ANIME STREAM
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span style={{ color: theme.neon, opacity: 0.7 }}>
          React · Node · Mongo
        </span>

        {getToken() ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token")
              window.location.reload()
            }}
            style={{
              background: "linear-gradient(135deg, #39ff14, #00ffcc)",
              border: "none",
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              color: theme.neon,
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
})

function AdminLogin() {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true")
      navigate("/admin")
    } else {
      alert("Wrong admin password")
    }
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 style={{ marginTop: "40px" }}>Admin Login</h1>

      <form
        onSubmit={handleLogin}
        style={{
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto"
}}
      >
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  )
}

function AuthPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login"

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Authentication failed")
        return
      }

      if (mode === "signup") {
        alert("Account created. Please login.")
        setMode("login")
        setUsername("")
        setPassword("")
        return
      }

      localStorage.setItem("auth-token", data.token)
      navigate("/")

    } catch (err) {
      console.error(err)
      alert("Auth request failed")
    }
  }

  return (
    <div style={pageStyle}>
      <Navbar />

      <h1 style={{ marginTop: "40px" }}>
        {mode === "login" ? "User Login" : "Create Account"}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto"
}}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: "15px", cursor: "pointer" }}
         onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login"
          ? "Create an account"
          : "Already have an account? Login"}
      </p>
      <Footer />
    </div>
  )
}

function AdminPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const [animeId, setAnimeId] = useState("")
  const [animeList, setAnimeList] = useState([])
  const [episodeTitle, setEpisodeTitle] = useState("")
  const [episodeNumber, setEpisodeNumber] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")

  // BRICK 17 - analytics state and effect
  const [animeCount, setAnimeCount] = useState(0)
  const [episodeCount, setEpisodeCount] = useState(0)

  useEffect(() => {
    const loadAnime = async () => {
      try {
        let res = await fetch(`${API}/api/anime`)

        // fallback if wrong port
        if (!res.ok) {
          res = await fetch("http://localhost:5000/api/anime")
        }

        const data = await res.json()

        if (Array.isArray(data)) {
          setAnimeCount(data.length)
          setAnimeList(data)
        } else {
          console.error("Anime API returned unexpected data:", data)
          setAnimeList([])
        }
      } catch (err) {
        console.error("Anime fetch failed:", err)
        setAnimeList([])
      }
    }

    const loadEpisodes = async () => {
      try {
        let res = await fetch(`${API}/api/episodes`)
        if (!res.ok) {
          res = await fetch("http://localhost:5000/api/episodes")
        }
        const data = await res.json()
        if (Array.isArray(data)) setEpisodeCount(data.length)
      } catch (err) {
        console.error("Episode fetch failed:", err)
      }
    }

    loadAnime()
    loadEpisodes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API}/api/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, coverImage })
      })

      await res.json()
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
    if (!animeId) {
      alert("Please select an anime before uploading the episode.")
      return
    }

    // Always use FormData, compatible with multer backend
    const formData = new FormData()
    formData.append("anime", animeId)
    formData.append("animeId", animeId)
    formData.append("title", episodeTitle)
    formData.append("episodeNumber", episodeNumber)

    // If a Cloud URL is provided, send it
    if (videoUrl && videoUrl.trim() !== "") {
      formData.append("videoUrl", videoUrl.trim())
    }

    // Optional local file upload
    if (videoFile) {
      formData.append("video", videoFile)
    }

    try {
      const res = await fetch(`${API}/api/episodes`, {
        method: "POST",
        body: formData
      })

      let data
      let text
      try {
        data = await res.json()
      } catch {
        text = await res.text()
      }

      if (!res.ok) {
        console.error("Upload failed raw response:", data || text)
        alert("Episode upload failed:\n" + JSON.stringify(data || text))
        return
      }

      console.log("Episode uploaded:", data)
      alert("Episode uploaded successfully")

      setEpisodeTitle("")
      setEpisodeNumber("")
      setVideoFile(null)
      setVideoUrl("")
    } catch (err) {
      console.error(err)
      alert("Episode upload failed")
    }
  }

  return (
    <div style={pageStyle}>
      <Navbar />

      {/* BRICK 17 - analytics dashboard */}
      <div style={{ marginTop: "20px", margin: "0 auto" }}>
        <h3>Total Anime: {animeCount}</h3>
        <h3>Total Episodes: {episodeCount}</h3>
      </div>

      <h1 style={{ marginTop: "40px" }}>Admin Dashboard</h1>

      {/* BRICK 44 – Admin anime management section */}
      <div style={{ marginTop: "30px", margin: "0 auto" }}>
        <h2>Manage Anime</h2>

        {animeList.map(a => (
          <div
            key={a._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "600px",
              background: "#111",
              padding: "10px",
              marginTop: "10px",
              border: "1px solid #39ff14",
              borderRadius: "6px"
            }}
          >
            <span>{a.title}</span>

            <button
              onClick={async () => {
                if (!confirm("Delete this anime?")) return

                try {
                  const res = await fetch(`${API}/api/anime/${a._id}`, {
                    method: "DELETE"
                  })

                  if (res.ok) {
                    setAnimeList(animeList.filter(x => x._id !== a._id))
                    setAnimeCount(prev => prev - 1)
                  } else {
                    alert("Delete failed")
                  }
                } catch (err) {
                  console.error(err)
                  alert("Delete failed")
                }
              }}
              style={{
                background: "#ff3b3b",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

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
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <input
          type="text"
          placeholder="Poster Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
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
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <label style={{ fontWeight: "bold" }}>Select Anime:</label>
        <select
          value={animeId}
          onChange={(e) => setAnimeId(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.neon,
            outline: "none"
          }}
        >
          <option value="">-- Select Anime --</option>
          {animeList.map(anime => (
            <option key={anime._id} value={anime._id}>
              {anime.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Episode Title"
          value={episodeTitle}
          onChange={(e) => setEpisodeTitle(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <input
          type="number"
          placeholder="Episode Number"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="OR paste Cloud video URL (Cloudinary / CDN)"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value)
            setVideoFile(null) // ensure no file upload overrides the CDN URL
          }}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Upload Episode Video
        </button>
      </form>
      <Footer />
    </div>
  )
}

function Home() {
  // Horizontal scroll helper for carousel rows
  const scrollRow = (id, dir) => {
    const el = document.getElementById(id)
    if (!el) return
    const amount = 320
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  // BRICK 26 - genre filtering
  const [genreFilter, setGenreFilter] = useState("All")
  const [watchlist, setWatchlist] = useState([])

  // BRICK 23 - hover preview state
  const [hoveredAnime, setHoveredAnime] = useState(null)
  const [hoverTimer, setHoverTimer] = useState(null)

  const [continueWatching, setContinueWatching] = useState([])
  const [episodesList, setEpisodesList] = useState([])

  useEffect(() => {
  const loadProgress = async () => {
    try {
      const token = localStorage.getItem("auth-token")

      const res = await fetch(`${API}/api/progress`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (Array.isArray(data)) {
        const ids = data.map(p => p.episodeId)
        setContinueWatching(ids)
      }
    } catch (err) {
      console.error("Progress fetch failed", err)
      setContinueWatching([])
    }
  }

  loadProgress()
}, [])

  useEffect(() => {
    fetch(`${API}/api/episodes`)
      .then(res => res.json())
      .then(data => setEpisodesList(data))
      .catch(() => setEpisodesList([]))
  }, [])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]")
    setWatchlist(saved)
  }, [])


  useEffect(() => {
    fetch(`${API}/api/anime`)
      .then(res => res.json())
      .then(data => {
        setAnimeList(data)
        setLoading(false)
      })
      .catch(() => {
        setAnimeList([])
        setLoading(false)
      })
  }, [])

  const allAnime = animeList

  // BRICK 26 - genre filter logic
  const filteredAnime = React.useMemo(() => {
    return allAnime.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
      const matchGenre =
        genreFilter === "All" || (a.genre && a.genre.includes(genreFilter))

      return matchSearch && matchGenre
    })
  }, [allAnime, search, genreFilter])

  return (
    <div style={pageStyle}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#050505",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px"
            }}
          >
            {[1,2,3,4].map(i => (
              <div
                key={i}
                style={{
                  width: "260px",
                  height: "320px",
                  background: "#111",
                  borderRadius: "10px",
                  border: "1px solid #222",
                  animation: "pulse 1.2s infinite"
                }}
              />
            ))}
          </div>
        </div>
      )}
      <Navbar />

      <div
        style={{
          width: "100%",
          height: "420px",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.9), transparent), url(https://cdn.myanimelist.net/images/anime/10/47347.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "0px"
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
            to="/"
            style={{
              background: "linear-gradient(135deg, #39ff14, #00ffcc)",
              color: "#000",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            ▶ Explore Anime
          </Link>
        </div>
      </div>

      {/* BRICK 18 - Watchlist Row */}
      {watchlist.length > 0 && (
        <>
          <h2 style={{ ...container, paddingTop: "20px" }}>My Watchlist</h2>

          <div
            style={{
              display: "flex",
              gap: "25px",
              overflowX: "auto",
              padding: "20px 40px"
            }}
          >
            {watchlist.map(anime => (
              <Link key={"watch-"+anime._id} to={`/anime/${anime._id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    width: "260px",
                    border: "1px solid #39ff14",
                    borderRadius: "10px",
                    overflow: "hidden"
                  }}
                >
                  <img loading="lazy" decoding="async"
                    src={anime.coverImage}
                    style={{ width: "100%", height: "320px", objectFit: "cover" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* BRICK 16 - Popular Anime Row */}
      <h2 style={{ ...container, paddingTop: "20px" }}>Popular Anime</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          overflowX: "auto",
          padding: "20px 40px"
        }}
      >
        {filteredAnime.slice(0,4).map(anime => (
          <Link key={"pop-"+anime._id} to={`/anime/${anime._id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                width: "260px",
                border: "1px solid #39ff14",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <img loading="lazy" decoding="async"
                src={anime.coverImage}
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
            </div>
          </Link>
        ))}
      </div>

      <h2 style={{ ...container, paddingTop: "20px" }}>Featured</h2>

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
        {/* BRICK 26 - genre buttons */}
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          {["All", "Action", "Comedy", "Romance", "Fantasy", "Shonen"].map(g => (
            <button
              key={g}
              onClick={() => setGenreFilter(g)}
              style={{
                padding: "6px 10px",
                background: genreFilter === g ? "#39ff14" : "#000",
                color: genreFilter === g ? "#000" : "#39ff14",
                border: "1px solid #39ff14",
                cursor: "pointer"
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {continueWatching.length > 0 && (
        <>
          <h2 style={{ ...container, paddingTop: "20px" }}>Continue Watching</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              padding: "20px 40px"
            }}
          >
            {continueWatching.map(id => (
              <Link key={id} to={`/watch/${id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    width: "260px",
                    background: "#0f0f0f",
                    borderRadius: "10px",
                    border: "1px solid #39ff14",
                    padding: "10px"
                  }}
                >
                  <img loading="lazy" decoding="async"
                    src={
                      animeList.find(a =>
                        a._id === (
                          episodesList.find(ep => ep._id === id)?.anime?._id ||
                          episodesList.find(ep => ep._id === id)?.anime
                        )
                      )?.coverImage ||
                      "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
                    }
                    style={{ width: "100%", borderRadius: "6px" }}
                  />

                  <p style={{ marginTop: "10px", color: "#39ff14" }}>
                    Resume Episode
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* BRICK 51 - Watch History */}
      {JSON.parse(localStorage.getItem("watch-history") || "[]").length > 0 && (
        <>
          <h2 style={{ ...container, paddingTop: "20px" }}>Watch History</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              padding: "20px 40px"
            }}
          >
            {JSON.parse(localStorage.getItem("watch-history") || "[]").map(id => (
              <Link key={"history-" + id} to={`/watch/${id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    width: "260px",
                    background: "#0f0f0f",
                    borderRadius: "10px",
                    border: "1px solid #39ff14",
                    padding: "10px"
                  }}
                >
                  <img loading="lazy" decoding="async"
                    src={
                      animeList.find(a =>
                        a._id === (
                          episodesList.find(ep => ep._id === id)?.anime?._id ||
                          episodesList.find(ep => ep._id === id)?.anime
                        )
                      )?.coverImage ||
                      "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
                    }
                    style={{ width: "100%", borderRadius: "6px" }}
                  />

                  <p style={{ marginTop: "10px", color: "#39ff14" }}>
                    Watched Episode
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* BRICK 48 - Recently Added Episodes */}
      <h2 style={{ ...container, paddingTop: "20px" }}>Recently Added</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          overflowX: "auto",
          padding: "20px 40px"
        }}
      >
        {episodesList.slice(-6).reverse().map(ep => {
          const anime = animeList.find(a =>
            a._id === (ep.anime?._id || ep.anime)
          )

          return (
            <Link
              key={"recent-" + ep._id}
              to={`/watch/${ep._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  width: "260px",
                  border: "1px solid #39ff14",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#0f0f0f"
                }}
              >
                <img loading="lazy" decoding="async"
                  src={anime?.coverImage || "https://cdn.myanimelist.net/images/anime/10/47347.jpg"}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: "10px" }}>
                  <h4 style={{ color: "#39ff14" }}>
                    {anime?.title || "Anime"}
                  </h4>

                  <p style={{ fontSize: "13px", color: "#9cff7a" }}>
                    Episode {ep.episodeNumber}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* BRICK 23 - Netflix style hover preview */}
      <h2 style={{ ...container, paddingTop: "20px" }}>Trending Anime</h2>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => scrollRow('trending-row','left')}
          style={{
            position: "absolute",
            left: "5px",
            top: "45%",
            zIndex: 10,
            background: "#39ff14",
            border: "none",
            padding: "6px 10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ◀
        </button>

        <div
          id="trending-row"
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            overflowX: "auto",
            padding: "20px 40px",
            width: "100%",
            scrollBehavior: "smooth"
          }}
        >
          {filteredAnime.map(anime => (
            <Link key={anime._id} to={`/anime/${anime._id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "260px",
                  background: theme.card,
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  setHoveredAnime(anime._id)
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)"
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.6)"
                }}
                onMouseLeave={(e) => {
                  clearTimeout(hoverTimer)
                  setHoveredAnime(null)
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                }}               
              >
                <div style={{ position: "relative", width: "100%", height: "360px" }}>
                  <img
                    src={anime.coverImage || "https://cdn.myanimelist.net/images/anime/10/47347.jpg"}
                    alt={anime.title}
                    onError={(e) => {
                      e.target.src = "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    }}
                  />
                  {/* BRICK 32: Netflix-style hover video preview */}
                  {hoveredAnime === anime._id && anime.trailerUrl && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0",
                        zIndex: 1
                      }}
                      onTimeUpdate={async (e) => {
  try {
    const token = localStorage.getItem("auth-token")

    await fetch(`${API}/api/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        episodeId: anime._id,
        time: e.target.currentTime
      })
    })
  } catch (err) {
    console.error("Progress save failed", err)
  }
}}
                    >
                      <source src={anime.trailerUrl} type="video/mp4" />
                    </video>
                  )}
                  {/* Cinematic gradient overlay and play button */}
                  {hoveredAnime === anime._id && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "120px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2
                      }}
                    >
                      <div
                      style={{
                        background: theme.neon,
                        color: "#000",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                      >
                        ▶ Play Preview
                      </div>
                    </div>
                  )}
                </div>

                {hoveredAnime === anime._id && (
  <div
    style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      background: "rgba(0,0,0,0.85)",
      padding: "12px",
      zIndex: 3
    }}
  >
    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
      <span
        style={{
          background: "#39ff14",
          color: "#000",
          padding: "2px 6px",
          fontSize: "12px",
          fontWeight: "bold",
          borderRadius: "3px"
        }}
      >
        HD
      </span>

      <span
        style={{
          border: "1px solid #39ff14",
          padding: "2px 6px",
          fontSize: "12px"
        }}
      >
        Anime
      </span>

      <span
        style={{
          border: "1px solid #39ff14",
          padding: "2px 6px",
          fontSize: "12px"
        }}
      >
        Sub
      </span>
    </div>

    <p
      style={{
        fontSize: "12px",
        color: theme.subText,
        margin: 0,
        lineHeight: "1.4"
      }}
    >
      {anime.description?.slice(0, 90)}...
    </p>
  </div>
)}

                <div style={{ padding: "15px" }}>
                  <h3 style={{ color: theme.neon }}>{anime.title}</h3>
                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    Episodes Available
                  </p>
                  <p style={{ fontSize: "14px", color: theme.subText }}>
                    {anime.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scrollRow('trending-row','right')}
          style={{
            position: "absolute",
            right: "5px",
            top: "45%",
            zIndex: 10,
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
            border: "none",
            padding: "6px 10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ▶
        </button>
      </div>
      <Footer/>
    </div>
  )
}

function AnimePage() {
  const { id } = useParams()
  const [episodes, setEpisodes] = useState([])
  const [anime, setAnime] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  // BRICK 27 - recommended anime
  const [recommended, setRecommended] = useState([])
  // BRICK 41 - comments system state
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  // BRICK 42 - persistent rating system state
  const [avgRating, setAvgRating] = useState(null)
  // BRICK 57 - SEO meta tags
  useEffect(() => {
    if (anime) {
      document.title = `${anime.title} | Anime Stream`

      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }

      meta.content = anime.description || 'Watch anime episodes online'
    }
  }, [anime])
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    fetch(`${API}/api/episodes`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(ep => {
          const ref = ep.anime?._id || ep.anime || ep.animeId
          return String(ref) === String(id)
        })

        // Brick 20: always sort episodes by episode number
        filtered.sort((a, b) => Number(a.episodeNumber) - Number(b.episodeNumber))

        setEpisodes(filtered)
      })
      .catch(() => setEpisodes([]))

    fetch(`${API}/api/anime`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a._id === id)
        if (found) setAnime(found)

        // simple recommendation logic (other anime)
        const others = data.filter(a => a._id !== id).slice(0,4)
        setRecommended(others)
      })

    // BRICK 41 - fetch comments
    fetch(`${API}/api/comments/${id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data)
      })
      .catch(() => setComments([]))

    // BRICK 42 - fetch rating
    fetch(`${API}/api/ratings/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.average === "number") {
          setAvgRating(data.average)
        }
      })
      .catch(() => {})

    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]")
    if (saved.find(a => a._id === id)) {
      setIsSaved(true)
    }
  }, [id])

  return (
    <div style={pageStyle}>
      <Navbar />

      {anime && (
        <div
          style={{
            width: "100%",
            height: "460px",
            backgroundImage: `url(${anime.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
            padding: "40px"
          }}
        >
          <div style={container}>
            <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
              {anime.title}
            </h1>
            <p style={{ maxWidth: "600px", color: theme.subText }}>
              {anime.description}
            </p>
            <button
              onClick={() => {
                if (!getToken()) {
                  alert("Please login to use watchlist")
                  return
                }
                const list = JSON.parse(localStorage.getItem("watchlist") || "[]")

                if (isSaved) {
                  const updated = list.filter(a => a._id !== anime._id)
                  localStorage.setItem("watchlist", JSON.stringify(updated))
                  setIsSaved(false)
                } else {
                  list.push(anime)
                  localStorage.setItem("watchlist", JSON.stringify(list))
                  setIsSaved(true)
                }
              }}
              style={{
                marginTop: "15px",
                padding: "10px 16px",
                background: "linear-gradient(135deg, #39ff14, #00ffcc)",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {isSaved ? "✓ In Watchlist" : "+ Add to Watchlist"}
            </button>
            <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
  {[1,2,3,4,5].map(star => (
    <span
      key={star}
      onClick={async () => {
        setUserRating(star)

        try {
          const res = await fetch(`${API}/api/ratings/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating: star })
          })

          const data = await res.json()

          if (data && typeof data.average === "number") {
            setAvgRating(data.average)
          }
        } catch (err) {
          console.error(err)
        }
      }}
      style={{
        cursor: "pointer",
        fontSize: "22px",
        color: star <= (userRating || Math.round(avgRating || 0)) ? theme.neon : "#555"
      }}
    >
      ★
    </span>       
  ))}

  {avgRating !== null && (
    <span style={{ marginLeft: "10px", color: theme.subText, fontSize: "14px" }}>
      {avgRating.toFixed(1)} / 5
    </span>
  )}
</div>
          </div>
        </div>
      )}

      <h2 style={{ ...container, paddingTop: "20px" }}>Episodes</h2>

      {/* BRICK 25 - sidebar layout for episodes */}
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "15px"
        }}
      >
        {episodes.map(ep => (
          <div
            key={ep._id}
            style={{
              display: "flex",
              gap: "15px",
              background: "#1a1a1a",
              padding: "12px",
              borderRadius: "8px",
              alignItems: "center"
            }}
          >
            <div
              style={{ width: "180px", height: "100px", position: "relative" }}
            >
              <img
                src={ep.thumbnail || anime?.coverImage || "https://cdn.myanimelist.net/images/anime/10/47347.jpg"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              <video
                muted
                loop
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause()
                  e.target.currentTime = 0
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                  opacity: 0,
                  transition: "opacity 0.2s"
                }}
                onMouseOver={(e) => (e.target.style.opacity = 1)}
                onMouseOut={(e) => (e.target.style.opacity = 0)}
              >
                <source
                  src={ep.videoUrl ? ep.videoUrl : `${API}/api/episodes/watch/${ep._id}`}
                  type="video/mp4"
                />
              </video>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: "6px" }}>
                Episode {ep.episodeNumber}
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
                    width: `${
                      (parseFloat(localStorage.getItem("progress-" + ep._id) || 0) / 30)
                    }%`,
                    background: "#39ff14",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <Link
                to={`/watch/${ep._id}`}
                style={{
                  color: theme.neon,
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                ▶ Watch Episode
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...container, marginTop: "40px" }}>
        <h3>Comments</h3>

        <textarea
          placeholder="Leave a comment about this anime..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0a0a0a",
            color: theme.text,
            outline: "none"
          }}
        />

        <button
          onClick={async () => {
            if (!newComment.trim()) return

            try {
              const res = await fetch(`${API}/api/comments/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newComment })
              })

              const data = await res.json()

              if (res.ok) {
                setComments([data, ...comments])
                setNewComment("")
              }
            } catch (err) {
              console.error(err)
            }
          }}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            background: "linear-gradient(135deg, #39ff14, #00ffcc)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Post Comment
        </button>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {comments.map((c, i) => (
            <div key={i} style={{ background: "#111", padding: "10px", borderRadius: "6px" }}>
              <span style={{ color: theme.subText, fontSize: "13px" }}>
                {c.username || "User"}
              </span>
              <p style={{ margin: "5px 0", color: theme.neon }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>


      {/* BRICK 27 - Recommended Anime */}
      {recommended.length > 0 && (
        <>
          <h2 style={{ ...container, paddingTop: "20px" }}>
            You May Also Like
          </h2>

          <div
            style={{
              display: "flex",
              gap: "25px",
              overflowX: "auto",
              padding: "20px 40px"
            }}
          >
            {recommended.map(rec => (
              <Link
                key={rec._id}
                to={`/anime/${rec._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "220px",
                    border: "1px solid #39ff14",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#0f0f0f"
                  }}
                >
                  <img
                    src={rec.coverImage}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  />

                  <div style={{ padding: "10px" }}>
                    <h4 style={{ color: theme.neon }}>{rec.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      <Footer/>
    </div>
  )
}

function WatchPage() {
  const { id } = useParams()
  const [showSkip, setShowSkip] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [idleTimer, setIdleTimer] = useState(null)
  const introTime = 60
  const navigate = useNavigate()
  const [episodesList, setEpisodesList] = useState([])
  // BRICK 15: Add countdown state
  const [videoRef, setVideoRef] = useState(null)
  const [isMiniPlayer, setIsMiniPlayer] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [showNextOverlay, setShowNextOverlay] = useState(false)
  const [nextEpisodeId, setNextEpisodeId] = useState(null)

  // BRICK 24 - resume playback
  const [savedProgress, setSavedProgress] = useState(null)

  // BRICK 24 - load saved progress and setSavedProgress
  useEffect(() => {
    const saved = localStorage.getItem("progress-" + id)
    if (saved) {
      setSavedProgress(parseFloat(saved))
    }

    if (saved && videoRef) {
      videoRef.currentTime = saved
    }
  }, [videoRef, id])
  useEffect(() => {
    fetch(`${API}/api/episodes`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
      .catch(() => setEpisodes([]))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef) return

      const rect = videoRef.getBoundingClientRect()

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsMiniPlayer(true)
      } else {
        setIsMiniPlayer(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [videoRef])

  // Fetch episode data to get videoUrl and all episodes for navigation
  const [episodeData, setEpisodeData] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/episodes`)
      .then(res => res.json())
      .then(data => {
        // sort episodes by episode number
        const sorted = [...data].sort((a,b)=>Number(a.episodeNumber)-Number(b.episodeNumber))
        setEpisodesList(sorted)

        const ep = sorted.find(e => e._id === id)
        if (ep) setEpisodeData(ep)
      })
  }, [id])

  const handleTimeUpdate = (e) => {
    const time = e.target.currentTime
    localStorage.setItem("progress-" + id, time)
  }

  // BRICK 15: Next Episode Countdown (BRICK 22: use episodesList and navigate)
  const handleEnded = async () => {
    try {
      const index = episodesList.findIndex(e => e._id === id)
      const next = episodesList[index + 1]
      if (!next) return

      let seconds = 5
      setCountdown(seconds)

      const timer = setInterval(() => {
        seconds--
        setCountdown(seconds)
        if (seconds <= 0) {
          clearInterval(timer)
          navigate(`/watch/${next._id}`)
        }
      }, 1000)
    } catch {}
  }

  return (
   <div style={pageStyle}>
  <Navbar />

  {/* BRICK 15: Next episode countdown UI */}
  {countdown !== null && (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        background: "#000",
        border: "1px solid #39ff14",
        padding: "15px 20px",
        borderRadius: "8px",
        color: "#39ff14"
      }}
    >
      Next episode in {countdown}...
    </div>
  )}

  <h1 style={{ paddingTop: "40px" }}>Watching Episode</h1>

  <select
    value={id}
    onChange={(e) => navigate(`/watch/${e.target.value}`)}
    style={{
      marginTop: "10px",
      padding: "8px",
      background: "#000",
      color: "#39ff14",
      border: "1px solid #39ff14"
    }}
  >
    {episodesList?.map((ep) => (
      <option key={ep._id} value={ep._id}>
        Episode {ep.episodeNumber}
      </option>
    ))}
  </select>

  {/* BRICK 40 - Quick navigation buttons */}
  <div
    style={{
      marginTop: "10px",
      display: "flex",
      gap: "10px"
    }}
  >
    <button
      onClick={() => {
        const index = episodesList?.findIndex((e) => e._id === id)
        if (index > 0) {
          const prev = episodesList[index - 1]
          navigate(`/watch/${prev._id}`)
        }
      }}
      style={{
        padding: "8px 14px",
        background: "#000",
        color: "#39ff14",
        border: "1px solid #39ff14",
        cursor: "pointer"
      }}
    >
      ◀ Previous
    </button>

    <button
      onClick={() => {
        const index = episodesList?.findIndex((e) => e._id === id)
        if (index !== -1 && episodesList[index + 1]) {
          const next = episodesList[index + 1]
          navigate(`/watch/${next._id}`)
        }
      }}
      style={{
        padding: "8px 14px",
        background: "#39ff14",
        color: "#000",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Next ▶
    </button>
  </div>

  {/* BRICK 24 - resume controls */}
  {savedProgress !== null && (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        gap: "10px",
        alignItems: "center"
      }}
    >
      <button
        onClick={() => {
          if (videoRef?.current) {
            videoRef.current.currentTime = savedProgress
          }
        }}
        style={{
          padding: "8px 12px",
          background: "#39ff14",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Resume from {Math.floor(savedProgress)}s
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("progress-" + id)
          if (videoRef?.current) {
            videoRef.current.currentTime = 0
          }
          setSavedProgress(null)
        }}
        style={{
          padding: "8px 12px",
          background: "#222",
          border: "1px solid #39ff14",
          color: "#39ff14",
          cursor: "pointer"
        }}
      >
        Start from Beginning
      </button>
    </div>
  )}

  {/* BRICK 50 - Autoplay Toggle */}
  <div
    style={{
      marginTop: "15px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <label style={{ color: "#39ff14", fontWeight: "bold" }}>
      Autoplay Next Episode
    </label>

    <input
      type="checkbox"
      defaultChecked={localStorage.getItem("autoplay") !== "false"}
      onChange={(e) => {
        localStorage.setItem("autoplay", e.target.checked)
      }}
    />
  </div>

  <div
    onMouseMove={() => {
      setShowControls(true)

      if (idleTimer) clearTimeout(idleTimer)

      const timer = setTimeout(() => {
        setShowControls(false)
      }, 2000)

      setIdleTimer(timer)
    }}
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      transition: "opacity 0.3s"
    }}
  >
    <video
      ref={(ref) => {
        if (ref) setVideoRef(ref)
      }}
      controls
      autoPlay
      tabIndex="0"
      onKeyDown={(e) => {
        const v = e.target

        if (e.code === "Space") {
          e.preventDefault()
          if (v.paused) v.play()
          else v.pause()
        }

        if (e.code === "ArrowRight") {
          v.currentTime += 10
        }

        if (e.code === "ArrowLeft") {
          v.currentTime -= 10
        }

        if (e.code === "ArrowUp") {
          v.volume = Math.min(1, v.volume + 0.1)
        }

        if (e.code === "ArrowDown") {
          v.volume = Math.max(0, v.volume - 0.1)
        }
      }}
      preload="none"
      playsInline
      onTimeUpdate={(e) => {
        const time = e.target.currentTime

        localStorage.setItem("progress-" + id, time)

        if (time > introTime) {
          setShowSkip(false)
        }
      }}
      onEnded={() => {
        if (localStorage.getItem("autoplay") === "false") return

        const currentIndex = episodesList?.findIndex(ep => ep._id === id)

        if (currentIndex !== -1 && episodesList[currentIndex + 1]) {
          const nextEpisode = episodesList[currentIndex + 1]
          navigate(`/watch/${nextEpisode._id}`)
        }
      }}
      style={{
        width: isMiniPlayer ? "300px" : "100%",
        maxWidth: isMiniPlayer ? "300px" : "1100px",
        position: isMiniPlayer ? "fixed" : "relative",
        bottom: isMiniPlayer ? "20px" : "auto",
        right: isMiniPlayer ? "20px" : "auto",
        zIndex: isMiniPlayer ? 999 : "auto",
        marginTop: isMiniPlayer ? "0" : "20px",
        borderRadius: "12px",
        boxShadow: isMiniPlayer
          ? "0 10px 30px rgba(0,0,0,0.8)"
          : "0 20px 60px rgba(0,0,0,0.8)",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <source
        src={
          episodeData?.videoUrl
            ? episodeData.videoUrl
            : `${API}/api/episodes/watch/${id}`
        }
        type="video/mp4"
      />
    </video>

    {/* Custom progress bar */}
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        marginTop: "10px",
        opacity: showControls ? 1 : 0,
        transition: "opacity 0.3s"
      }}
    >
      <input
        type="range"
        min="0"
        max={videoRef?.duration || 100}
        value={videoRef?.currentTime || 0}
        onChange={(e) => {
          if (videoRef) {
            videoRef.currentTime = e.target.value
          }
        }}
        style={{
          width: "100%",
          accentColor: "#39ff14",
          cursor: "pointer"
        }}
      />
    </div>

    {/* Volume slider */}
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        opacity: showControls ? 1 : 0,
        transition: "opacity 0.3s"
      }}
    >
      <span style={{ color: "#39ff14" }}>🔊</span>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={videoRef?.volume || 1}
        onChange={(e) => {
          if (videoRef) {
            videoRef.volume = e.target.value
          }
        }}
        style={{
          width: "200px",
          accentColor: "#39ff14",
          cursor: "pointer"
        }}
      />
    </div>

    {showSkip && showControls && (
      <button
        onClick={() => {
          if (videoRef?.current) {
            videoRef.current.currentTime = introTime
            setShowSkip(false)
          }
        }}
        style={{
          position: "absolute",
          bottom: "120px",
          right: "60px",
          padding: "10px 16px",
          background: "linear-gradient(135deg, #39ff14, #00ffcc)",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        ⏭ Skip Intro
      </button>
    )}

    <div
      onClick={() => {
        if (!videoRef?.current) return
        if (videoRef.current.paused) videoRef.current.play()
        else videoRef.current.pause()
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 9,
        opacity: showControls ? 1 : 0,
        transition: "opacity 0.3s"
      }}
    >
      ▶
    </div>
  </div>

  <button
    onClick={() => {
      const index = episodesList?.findIndex(e => e._id === id)
      if (index !== -1 && episodesList[index + 1]) {
        const next = episodesList[index + 1]
        navigate(`/watch/${next._id}`)
      } else {
        alert("No next episode available")
      }
    }}
    style={{
      marginTop: "20px",
      padding: "10px 16px",
      background: "#39ff14",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ▶ Next Episode
  </button>

  <Link
    to="/"
    style={{
      marginTop: "20px",
      color: "#39ff14",
      textDecoration: "none"
    }}
  >
    ← Back to Home
  </Link>

  <Footer />
</div>
)
}
function App() {

  // Remove default browser white margin around the page
  useEffect(() => {
    document.body.style.margin = "0"
    document.body.style.background = "#050505"
  }, [])

  return (
    <ErrorBoundary>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/anime/:id" element={<AnimePage />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            localStorage.getItem("admin-auth") === "true"
              ? <AdminPage />
              : <AdminLogin />
          }
        />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </HashRouter>
    </ErrorBoundary>
  )
}

export default App