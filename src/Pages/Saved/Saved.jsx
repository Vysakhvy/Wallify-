import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Saved() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [savedPictures, setSavedPictures] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/register')
      return
    }

    const loadSaved = async () => {
      try {
        const response = await fetch(`http://localhost:3000/savedPictures?userId=${user.id}`)
        if (!response.ok) throw new Error()
        setSavedPictures(await response.json())
      } catch {
        setError('Could not load saved wallpapers')
      }
    }

    loadSaved()
  }, [])

  const downloadWallpaper = async (picture) => {
    if (!user) {
      navigate('/register')
      return
    }

    try {
      const response = await fetch(picture.image)
      if (!response.ok) throw new Error()

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${picture.title}.jpg`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      setError('Could not download wallpaper')
    }
  }

  const removeWallpaper = async (picture) => {
    try {
      await fetch(`http://localhost:3000/savedPictures/${picture.id}`, {
        method: 'DELETE'
      })
      setSavedPictures((old) => old.filter((item) => item.id !== picture.id))
    } catch {
      setError('Could not remove wallpaper')
    }
  }

  if (!user) return null

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1>My Saved Wallpapers</h1>
        <p className="text-muted">Your personal Pinterest-style collection</p>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {savedPictures.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No saved wallpapers yet.</h4>
          <button className="btn btn-info mt-3" onClick={() => navigate('/')}>
            Browse Wallpapers
          </button>
        </div>
      ) : (
        <div className="wallpaper-grid">
          {savedPictures.map((picture) => (
            <div className="wallpaper-card" key={picture.id}>
              <img src={picture.image} alt={picture.title} />
              <div className="wallpaper-overlay">
                <span>{picture.title}</span>
                <div className="wallpaper-actions">
                  <button className="save-btn saved" onClick={() => removeWallpaper(picture)}>
                    ♥ Saved
                  </button>
                  <button className="download-btn" onClick={() => downloadWallpaper(picture)}>
                    ↓ Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
