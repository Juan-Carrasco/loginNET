using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPersonasRepository
    {
        Persona Create(Persona persona);
        Persona Read(long Id);
        IQueryable<Persona> List();
        void Update(Persona persona);
        void Delete(long Id);

    }
}
