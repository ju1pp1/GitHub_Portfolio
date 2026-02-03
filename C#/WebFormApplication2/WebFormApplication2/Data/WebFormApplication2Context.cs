using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebFormApplication2.Models;

namespace WebFormApplication2.Data
{
    public class WebFormApplication2Context : DbContext
    {
        public WebFormApplication2Context (DbContextOptions<WebFormApplication2Context> options)
            : base(options)
        {
        }

        public DbSet<WebFormApplication2.Models.PersonData> PersonData { get; set; } = default!;
    }
}
