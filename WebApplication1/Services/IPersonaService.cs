using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPersonaService
    {
        Persona Create(Persona persona);
        Persona Read(long Id);
        IQueryable<Persona> List();
        void Update(Persona persona);
        void Delete(long Id);
    }
}