import projector2 from '/imagenes/projector2.jpg';
import laptop2 from '/imagenes/laptop2.jpeg';
import camara1 from '/imagenes/camara1.jpeg';

function HomePage() {
    return (
        <div className="flex flex-col items-center py-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center text-white">Bienvenido a la Gestión de Audiovisuales</h1>
            <br></br>

            <div className="flex space-x-4">
                <img src={projector2} alt="Gestión de Audiovisuales" className="w-full max-w-md rounded-lg shadow-lg" />
                <img src={laptop2} alt="Gestión de Audiovisuales" className="w-full max-w-md rounded-lg shadow-lg" />
                <img src={camara1} alt="Gestión de Audiovisuales" className="w-full max-w-md rounded-lg shadow-lg" />
            </div>
            <ul className="mt-4 text-white">
            </ul>
            <br></br>
            <h2 className="font-bold text-2xl mt-4 text-white">Proyecto de gestión Unapec</h2>
            <p className="text-xl mt-10 text-white">Autores: Joel, Matias y Rafael</p>
        </div>
    );
}

export default HomePage;


