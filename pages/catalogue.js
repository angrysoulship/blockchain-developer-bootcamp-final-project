import DinoDisplay from '../components/DinoDisplay';

export default function Catalogue() {
  return (
    <div>
      <head>
        <title>Crypto T-rex | Catalogue</title>
      </head>
      <div className="center">
        <div className="center title">
          <h1>Catalogue</h1>
        </div>
        <div className="created-dinos">
          <DinoDisplay />
          <DinoDisplay />
        </div>
      </div>
    </div>
  )
}
