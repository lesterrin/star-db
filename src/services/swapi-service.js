export default class SwapiService {
    _apiBase = 'https://swapi.py4e.com/api'; //нижнее подчеркивание -конвеншн,
    // который говорит другим разработчикам, что это приватная часть класса,
    // которую не стоит использовать или изменять снаружи
    _imageBase = 'https://starwars-visualguide.com/assets/img';
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`); //что такое promise, зачем нужен then

        if (!res.ok){
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);//Разобрать синтаксис
        }
        return await res.json();
    }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`); //что такое template-литерал
        return res.results.map(this._transformPerson);
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    getPersonImage = ({id}) => {
        return`${this._imageBase}/characters/${id}.jpg`;
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`); //что такое template-литерал
        return res.results.map(this._transformPlanet);
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`); //что такое tamplate-литерал
        return this._transformPlanet(planet);
    }

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    }

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`); //что такое template-литерал
        return res.results.map(this._transformStarship);
    }

    getStarship = async (id) =>{
        const starship = await this.getResource(`/starships/${id}/`); //что такое tamplate-литерал
        return this._transformStarship(starship);
    }

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
        return{
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity

        }
    };
}
