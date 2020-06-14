import React, { useState } from "react"
import api from "../services/api"
import { useHistory } from "react-router-dom"
import "./New.css"

export default function New() {
  const [formData, setFormData] = useState({
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: "",
  })

  const history = useHistory()

  function handleChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  function handleImage(e) {
    setFormData({ image: e.target.files[0] })
  }
  async function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData()

    data.append("image", formData.image)
    data.append("author", formData.author)
    data.append("place", formData.place)
    data.append("description", formData.description)
    data.append("hashtags", formData.hashtags)

    await api.post("posts", data)

    history.push("/")
  }

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <input type="file" name="image" onChange={handleImage} />
      <input
        type="text"
        placeholder="Autor do post"
        name="author"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Local do post"
        name="place"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Descrição do post"
        name="description"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Hashtags do post"
        name="hashtags"
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
