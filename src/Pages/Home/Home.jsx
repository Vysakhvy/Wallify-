import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="wallify-home">
      <section className="wallify-hero text-center">
        <div className="container py-5">
          <h1 className="display-3 fw-bold">Welcome to Wallify</h1>
          <p className="lead mx-auto" style={{ maxWidth: '750px' }}>
            Wallify is your place to discover beautiful wallpapers for your phone,
            desktop, and everyday inspiration.
          </p>
          <p className="mx-auto" style={{ maxWidth: '700px' }}>
            Create an account, explore our wallpaper gallery, save your favorite
            wallpapers, and download them whenever you want.
          </p>
          <Link to="/register" className="btn btn-danger btn-lg me-2">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-dark btn-lg">
            Login
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="wallify-feature h-100">
              <h3>Discover</h3>
              <p>Browse a collection of beautiful wallpapers and find one you love.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wallify-feature h-100">
              <h3>Save</h3>
              <p>Save your favorite wallpapers to your personal collection.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wallify-feature h-100">
              <h3>Download</h3>
              <p>Download your favorite wallpapers directly to your device.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
