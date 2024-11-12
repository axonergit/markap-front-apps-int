    import axiosClient from "../config/axiosClient.js";
    import {Avatar, Accordion, AccordionItem, CircularProgress} from '@nextui-org/react';
    import {useQuery} from "@tanstack/react-query";

    export default function AboutMe(){

        const {data: userProfile, error, isLoading} = useQuery({
            queryKey: ['userProfile'],
            queryFn: async () => {
                const response = await axiosClient.get('/users/me');
                return response.data;
            },
        });

        return (
            <div className="about-me" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    src="https://akamai.sscdn.co/uploadfile/letras/fotos/5/9/1/b/591b070413cf1d9c34bc8528ee500268.jpg"
                    className="w-80 h-80 text-large"
                />
                <div className="bg-neutral-content"
                     style={{marginTop: "1em", borderRadius: "8px"}}>
                    {isLoading && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "3vh"
                        }}>
                            <CircularProgress label="Cargando..." />
                        </div>
                    )}
                    {userProfile && (
                        <Accordion>
                            <AccordionItem className="w-80 h-190" key="1" subtitle="Ver Informacion"
                                           title={userProfile.nombreCompleto}>
                                email: {userProfile.email}<br />
                                nacimiento: {userProfile.birthDate}
                            </AccordionItem>
                        </Accordion>
                    )}
                    {error && (
                        <p>Error al cargar el perfil del usuario.</p>
                    )}
                </div>
            </div>
        );
    }