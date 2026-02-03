using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coop1
{
    class Program
    {
        static void Main(string[] args)
        {
            Pelaaja guru = new Pelaaja();
            guru.Alias = "Guru";
            guru.Pisteet = 100;
            
            Pelaaja p = new Pelaaja();
            p.Alias = "ActionMan";
            p.Pisteet = 10;
            Tulostaja tulostaja = new Tulostaja();
            tulostaja.setGuru(guru);

            tulostaja.Tulosta(p);

            Pelaaja p2 = new Pelaaja();
            p2.Alias = "ActionWoMan";
            p2.Pisteet = 5;
            tulostaja.Tulosta(p2);
        }
    }
}
