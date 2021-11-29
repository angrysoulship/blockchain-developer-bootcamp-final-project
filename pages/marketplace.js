import DinoDisplay from '../components/DinoDisplay';

export default function Marketplace() {
  return (
    <div>
      <head>
        <title>Crypto T-rex | Marketplace</title>
      </head>
      <div className="center">
        <div className="center title">
          <h1>Marketplace</h1>
        </div>
        <div className="created-dinos">
          <DinoDisplay />
          <DinoDisplay />
          <DinoDisplay />
        </div>
      </div>
    </div>
  )
}
