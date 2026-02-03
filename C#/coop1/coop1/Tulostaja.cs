using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace coop1
{
    class Tulostaja
    {
        Pelaaja edellinen;
        Pelaaja guru;

        public void setGuru(Pelaaja g)
        {
            guru = g;
        }
        public Tulostaja()
        {
            edellinen = new Pelaaja();
        }

        public void Tulosta(Pelaaja p)
        {
            if(edellinen.Pisteet > p.Pisteet)
            {
                Console.WriteLine("Huonompi kuin " + edellinen.Alias);
            }
            if(guru.Pisteet > p.Pisteet)
            {
                Console.WriteLine("Huonompi kuin guru");
            }
                Console.WriteLine("="+p.Alias);
            
            edellinen.Pisteet = p.Pisteet;
            edellinen.Alias = p.Alias;
            
        }
    }
}
