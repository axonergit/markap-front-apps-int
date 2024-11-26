import { Avatar, Accordion, AccordionItem, CircularProgress } from '@nextui-org/react';

export default function AboutMe({ userProfile, error, isLoading }) {
    if (error) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar
                src="https://akamai.sscdn.co/uploadfile/letras/fotos/5/9/1/b/591b070413cf1d9c34bc8528ee500268.jpg"
                className="w-80 h-80 text-large"
            />
            <div
                className="mt-5"
                style={{
                    borderRadius: "8px",
                }}
            >
                {isLoading && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "3vh",
                        }}
                    >
                        <CircularProgress label="Cargando..." />
                    </div>
                )}
                {!isLoading && userProfile && (
                    <Accordion variant="splitted">
                        <AccordionItem
                            className="w-80 h-190 border-1 border-base-300 bg-neutral-content rounded-2xl text-neutral"
                            key="1"
                            subtitle="Ver Información"
                            title={userProfile.nombreCompleto}
                        >
                            email: {userProfile.email}
                            <br />
                            nacimiento: {userProfile.birthDate}
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
}
