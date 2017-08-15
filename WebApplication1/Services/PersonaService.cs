using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class PersonaService : IPersonaService
    {
        IPersonasRepository personaRepository;
        public PersonaService(IPersonasRepository personaRepository)
        {
            this.personaRepository = personaRepository;
        }

        public Persona Create(Persona persona)
        {
            return personaRepository.Create(persona);
        }

        public void Delete(long Id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Persona> List()
        {
            return personaRepository.List();
        }

        public Persona Read(long Id)
        {
            return personaRepository.Read(Id);
        }

        public void Update(Persona persona)
        {
            personaRepository.Update(persona);
        }
    }
}