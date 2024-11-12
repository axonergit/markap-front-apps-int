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

    if (isLoading) return (
        <div className="about-me" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Avatar src="" className="w-80 h-80 text-large"/>
            <div style={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "3vh" }}>
                <CircularProgress label="Cargando..."/>
            </div>
        </div>
    )

    if (userProfile) return (
        <div className="about-me">
            <Avatar src="https://akamai.sscdn.co/uploadfile/letras/fotos/5/9/1/b/591b070413cf1d9c34bc8528ee500268.jpg" className="w-80 h-80 text-large"/>
            <Accordion>
                <AccordionItem className="w-80 h-190" key="1" subtitle="Ver Informacion"
                               title={userProfile.nombreCompleto}>
                    email: {userProfile.email}<br/>
                    nacimiento: {userProfile.birthDate}
                </AccordionItem>
            </Accordion>
        </div>
    );
}