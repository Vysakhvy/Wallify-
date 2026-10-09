import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'https://wallify-backend-crj0.onrender.com'

const wallpapers = [
  { id: 'wallpaper-1', title: 'Mountain', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-2', title: 'Forest', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-3', title: 'Ocean', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-4', title: 'City', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-5', title: 'Flowers', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-6', title: 'Desert', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-7', title: 'Lake', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-8', title: 'Night Sky', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85' },
  { id: 'wallpaper-9', title: 'Aurora', image: 'https://picsum.photos/seed/wallpaper-9/900/1200' },
  { id: 'wallpaper-10', title: 'Snow Mountain', image: 'https://picsum.photos/seed/wallpaper-10/900/1200' },
  { id: 'wallpaper-11', title: 'Purple Sky', image: 'https://picsum.photos/seed/wallpaper-11/900/1200' },
  { id: 'wallpaper-12', title: 'Pink Sunset', image: 'https://picsum.photos/seed/wallpaper-12/900/1200' },
  { id: 'wallpaper-13', title: 'Tropical Beach', image: 'https://picsum.photos/seed/wallpaper-13/900/1200' },
  { id: 'wallpaper-14', title: 'Green Hills', image: 'https://picsum.photos/seed/wallpaper-14/900/1200' },
  { id: 'wallpaper-15', title: 'Waterfall', image: 'https://picsum.photos/seed/wallpaper-15/900/1200' },
  { id: 'wallpaper-16', title: 'Autumn Road', image: 'https://picsum.photos/seed/wallpaper-16/900/1200' },
  { id: 'wallpaper-17', title: 'Golden Forest', image: 'https://picsum.photos/seed/wallpaper-17/900/1200' },
  { id: 'wallpaper-18', title: 'Blue Lake', image: 'https://picsum.photos/seed/wallpaper-18/900/1200' },
  { id: 'wallpaper-19', title: 'Palm Trees', image: 'https://picsum.photos/seed/wallpaper-19/900/1200' },
  { id: 'wallpaper-20', title: 'Lavender Field', image: 'https://picsum.photos/seed/wallpaper-20/900/1200' },
  { id: 'wallpaper-21', title: 'Misty Mountains', image: 'https://picsum.photos/seed/wallpaper-21/900/1200' },
  { id: 'wallpaper-22', title: 'Rainy Forest', image: 'https://picsum.photos/seed/wallpaper-22/900/1200' },
  { id: 'wallpaper-23', title: 'Starry Night', image: 'https://picsum.photos/seed/wallpaper-23/900/1200' },
  { id: 'wallpaper-24', title: 'Moonlight', image: 'https://picsum.photos/seed/wallpaper-24/900/1200' },
  { id: 'wallpaper-25', title: 'Cloudy Peaks', image: 'https://picsum.photos/seed/wallpaper-25/900/1200' },
  { id: 'wallpaper-26', title: 'Calm Sea', image: 'https://picsum.photos/seed/wallpaper-26/900/1200' },
  { id: 'wallpaper-27', title: 'Coral Beach', image: 'https://picsum.photos/seed/wallpaper-27/900/1200' },
  { id: 'wallpaper-28', title: 'Island', image: 'https://picsum.photos/seed/wallpaper-28/900/1200' },
  { id: 'wallpaper-29', title: 'Canyon', image: 'https://picsum.photos/seed/wallpaper-29/900/1200' },
  { id: 'wallpaper-30', title: 'Rocky Valley', image: 'https://picsum.photos/seed/wallpaper-30/900/1200' },
  { id: 'wallpaper-31', title: 'Winter Trees', image: 'https://picsum.photos/seed/wallpaper-31/900/1200' },
  { id: 'wallpaper-32', title: 'Snowy Forest', image: 'https://picsum.photos/seed/wallpaper-32/900/1200' },
  { id: 'wallpaper-33', title: 'Spring Flowers', image: 'https://picsum.photos/seed/wallpaper-33/900/1200' },
  { id: 'wallpaper-34', title: 'Cherry Blossoms', image: 'https://picsum.photos/seed/wallpaper-34/900/1200' },
  { id: 'wallpaper-35', title: 'Golden Sunset', image: 'https://picsum.photos/seed/wallpaper-35/900/1200' },
  { id: 'wallpaper-36', title: 'Orange Sky', image: 'https://picsum.photos/seed/wallpaper-36/900/1200' },
  { id: 'wallpaper-37', title: 'Blue Mountains', image: 'https://picsum.photos/seed/wallpaper-37/900/1200' },
  { id: 'wallpaper-38', title: 'River', image: 'https://picsum.photos/seed/wallpaper-38/900/1200' },
  { id: 'wallpaper-39', title: 'Hidden Lake', image: 'https://picsum.photos/seed/wallpaper-39/900/1200' },
  { id: 'wallpaper-40', title: 'Wildflowers', image: 'https://picsum.photos/seed/wallpaper-40/900/1200' },
  { id: 'wallpaper-41', title: 'Bamboo Forest', image: 'https://picsum.photos/seed/wallpaper-41/900/1200' },
  { id: 'wallpaper-42', title: 'Ocean Waves', image: 'https://picsum.photos/seed/wallpaper-42/900/1200' },
  { id: 'wallpaper-43', title: 'Coastal Road', image: 'https://picsum.photos/seed/wallpaper-43/900/1200' },
  { id: 'wallpaper-44', title: 'City Lights', image: 'https://picsum.photos/seed/wallpaper-44/900/1200' },
  { id: 'wallpaper-45', title: 'Modern Building', image: 'https://picsum.photos/seed/wallpaper-45/900/1200' },
  { id: 'wallpaper-46', title: 'Neon City', image: 'https://picsum.photos/seed/wallpaper-46/900/1200' },
  { id: 'wallpaper-47', title: 'Country Road', image: 'https://picsum.photos/seed/wallpaper-47/900/1200' },
  { id: 'wallpaper-48', title: 'Countryside', image: 'https://picsum.photos/seed/wallpaper-48/900/1200' },
  { id: 'wallpaper-49', title: 'Desert Dunes', image: 'https://picsum.photos/seed/wallpaper-49/900/1200' },
  { id: 'wallpaper-50', title: 'Red Canyon', image: 'https://picsum.photos/seed/wallpaper-50/900/1200' },
  { id: 'wallpaper-51', title: 'Palm Sunset', image: 'https://picsum.photos/seed/wallpaper-51/900/1200' },
  { id: 'wallpaper-52', title: 'Tropical Leaves', image: 'https://picsum.photos/seed/wallpaper-52/900/1200' },
  { id: 'wallpaper-53', title: 'Minimal Nature', image: 'https://picsum.photos/seed/wallpaper-53/900/1200' },
  { id: 'wallpaper-54', title: 'Dark Mountains', image: 'https://picsum.photos/seed/wallpaper-54/900/1200' },
  { id: 'wallpaper-55', title: 'Foggy Lake', image: 'https://picsum.photos/seed/wallpaper-55/900/1200' },
  { id: 'wallpaper-56', title: 'Sunrise Hills', image: 'https://picsum.photos/seed/wallpaper-56/900/1200' },
  { id: 'wallpaper-57', title: 'Evening Beach', image: 'https://picsum.photos/seed/wallpaper-57/900/1200' },
  { id: 'wallpaper-58', title: 'Peaceful Valley', image: 'https://picsum.photos/seed/wallpaper-58/900/1200' }
]

function Gallery() {
  const navigate = useNavigate()
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  })
  const [savedPictures, setSavedPictures] = useState([])
  const [downloadedIds, setDownloadedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('downloadedWallpapers')) || []
    } catch {
      return []
    }
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/register')
      return
    }

    const controller = new AbortController()

    const loadSavedPictures = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/savedPictures?userId=${user.id}`, {
          signal: controller.signal
        })
        if (!response.ok) throw new Error()
        const data = await response.json()
        setSavedPictures(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Could not load saved wallpapers')
        }
      }
    }

    loadSavedPictures()

    return () => controller.abort()
  }, [user, navigate])

  const isSaved = useCallback(
    (wallpaperId) => savedPictures.some((picture) => picture.wallpaperId === wallpaperId),
    [savedPictures]
  )

  const isDownloaded = useCallback(
    (wallpaperId) => downloadedIds.includes(wallpaperId),
    [downloadedIds]
  )

  const markAsDownloaded = (wallpaperId) => {
    setDownloadedIds((prev) => {
      if (prev.includes(wallpaperId)) return prev
      const updated = [...prev, wallpaperId]
      localStorage.setItem('downloadedWallpapers', JSON.stringify(updated))
      return updated
    })
  }

  const downloadWallpaper = async (wallpaper) => {
    if (!user) {
      navigate('/register')
      return
    }

    setError('')

    try {
      const response = await fetch(wallpaper.image, { mode: 'cors' })
      if (!response.ok) throw new Error()

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${wallpaper.title}.jpg`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      markAsDownloaded(wallpaper.id)
    } catch {
      // Direct link fallback if fetch is blocked by CORS
      window.open(wallpaper.image, '_blank')
      markAsDownloaded(wallpaper.id)
    }
  }

  const saveWallpaper = async (wallpaper) => {
    if (!user?.id) {
      setError('Please login again before saving a wallpaper')
      localStorage.removeItem('user')
      navigate('/login')
      return
    }

    setError('')
    const existing = savedPictures.find((picture) => picture.wallpaperId === wallpaper.id)

    try {
      if (existing) {
        const response = await fetch(`${API_BASE_URL}/savedPictures/${existing.id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error()
        setSavedPictures((old) => old.filter((picture) => picture.id !== existing.id))
      } else {
        const response = await fetch(`${API_BASE_URL}/savedPictures`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            wallpaperId: wallpaper.id,
            title: wallpaper.title,
            image: wallpaper.image
          })
        })

        if (!response.ok) throw new Error()
        const newPicture = await response.json()
        setSavedPictures((old) => [...old, newPicture])
      }
    } catch {
      setError('Could not update saved wallpaper')
    }
  }

  if (!user) return null

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1>Wallpaper Gallery</h1>
        <p className="text-muted">Find a wallpaper you like and save or download it.</p>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="wallpaper-grid">
        {wallpapers.map((wallpaper) => (
          <div className="wallpaper-card" key={wallpaper.id}>
            <img src={wallpaper.image} alt={wallpaper.title} loading="lazy" />
            <div className="wallpaper-overlay">
              <span>{wallpaper.title}</span>
              <div className="wallpaper-actions">
                <button
                  className={isSaved(wallpaper.id) ? 'save-btn saved' : 'save-btn'}
                  onClick={() => saveWallpaper(wallpaper)}
                >
                  {isSaved(wallpaper.id) ? '♥ Saved' : '♡ Save'}
                </button>
                <button
                  className={isDownloaded(wallpaper.id) ? 'download-btn downloaded' : 'download-btn'}
                  onClick={() => downloadWallpaper(wallpaper)}
                >
                  {isDownloaded(wallpaper.id) ? '✓ Downloaded' : '↓ Download'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery