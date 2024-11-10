import axiosClient from "../config/axiosClient.js";
import {Avatar, Accordion, AccordionItem } from '@nextui-org/react';
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
        <div className="about-me">
            <Avatar src={userProfile ? userProfile.avatar : null} className="w-80 h-80 text-large" />
            <Accordion>
                <AccordionItem className="w-80 h-190" key="1" subtitle="Ver descripcion"
                               title={userProfile ? userProfile.name : "Error Usuario"}>
                    {userProfile ? userProfile.description : "Error Usuario"}
                </AccordionItem>
            </Accordion>
        </div>
    );
}