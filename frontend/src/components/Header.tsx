import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COUNTRIES, ADD_COUNTRY } from "../api/example";
import { Country } from "../types";
import { useState } from "react";
import "../App.css";

export function Header() {
    const { data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [emoji, setEmoji] = useState("");
    const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
        refetchQueries: [{ query: GET_COUNTRIES }],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !code || !emoji) return;
        await addCountry({
            variables: { data: { name, code, emoji } },
        });
        setShowModal(false);
        setName("");
        setCode("");
        setEmoji("");
    };

    return (
        <header className="header">
            <h1>Checkpoint : frontend</h1>
            <button onClick={() => setShowModal(true)}>Add Country</button>
            <nav style={{ display: "flex", gap: 8 }}>
                {data &&
                    data.countries.map((country) => (
                        <Link
                            className="Link"
                            key={country.code}
                            to={`/country/${country.code}`}
                        >
                            {country.emoji} {country.name}
                        </Link>
                    ))}
            </nav>
            {showModal && (
                <div className="modal-bg">
                    <div className="modal">
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ float: "right" }}
                        >
                            X
                        </button>
                        <h2>Ajouter un pays</h2>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <label>
                                Nom
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Code
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                    maxLength={2}
                                    style={{ textTransform: "uppercase" }}
                                />
                            </label>
                            <label>
                                Emoji
                                <input
                                    value={emoji}
                                    onChange={(e) => setEmoji(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" disabled={loading}>
                                Ajouter
                            </button>
                            {error && (
                                <span style={{ color: "red" }}>
                                    Erreur lors de l'ajout : {error.message}
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}
