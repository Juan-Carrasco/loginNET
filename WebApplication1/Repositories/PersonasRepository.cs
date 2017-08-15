using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PersonasRepository : IPersonasRepository
    {
        public Persona Create(Persona persona)
        {
            return ApplicationDbContext.applicationDbContext.Personas.Add(persona);
        }

        public void Delete(long Id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Persona> List()
        {
            IList<Persona> lista = new List<Persona>(ApplicationDbContext.applicationDbContext.Personas);

            return lista.AsQueryable();
        }

        public Persona Read(long Id)
        {
            return ApplicationDbContext.applicationDbContext.Personas.Find(Id);

        }

        public void Update(Persona persona)
        {
            if (ApplicationDbContext.applicationDbContext.Personas.Count(p => p.Id == persona.Id) == 0)
            {
                throw new Exception("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(persona).State = EntityState.Modified;
        }
    }
}