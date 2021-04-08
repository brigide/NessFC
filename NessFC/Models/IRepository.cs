using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace NessFC.Models
{
    public interface IRepository<T>
    {
        IQueryable<T> List { get;  }
        public Task<List<T>> ToListAsync();

        public List<T> ToList();

        public ValueTask<T> FindByIdAsync(int id);

        public void Add(T t);

        public void Edit(T t);

        public void Delete(T t);
    }
}
