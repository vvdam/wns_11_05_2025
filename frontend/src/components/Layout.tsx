import { Outlet, useParams } from "react-router-dom";
import { Header } from "./Header";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../api/example";
import { Country } from "../types";

export function PageLayout() {
    const { code } = useParams();
    const { data, error } = useQuery<{ country: Country }>(GET_COUNTRY, {
        variables: { code },
        skip: !code,
    });

    // Ajout des logs pour debug
    console.log("code dans URL:", code);
    console.log("data reçue:", data);
    console.log("erreur éventuelle:", error);

    return (
        <body>
            <Header />
            <main>
                <Outlet />
                {data && data.country && (
                    <section className="country-details">
                        <span className="emoji">{data.country.emoji}</span>
                        <p>Nom : {data.country.name}</p>
                        <p>Code : {data.country.code}</p>
                        {data.country.continent && (
                            <p>Continent : {data.country.continent.name}</p>
                        )}
                    </section>
                )}
            </main>
        </body>
    );
}
