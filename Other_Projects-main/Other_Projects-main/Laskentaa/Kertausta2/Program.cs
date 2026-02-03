using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kertausta2
{
    class Program
    {
        static void Main(string[] args)
        {
            Piste piste = new Piste(2, 3);
            Piste toinen = new Piste(12, 13);
            double etäisyys = piste.Etäisyys(toinen);
            Console.WriteLine(etäisyys);

            // Testaaja t = new Testaaja(); // Tämä ei toimi. Älä muuta kuitenkaan Testaaja.cs-tiedostoa, vaan tätä riviä käyttämään tehtävässä (alla) tekemääsi luokkaa.
            // TEHT: Jotta seuraava rivi toimisi kommenttien poistamisen jälkeen, joudut perimään Testaaja-luokan (=tee uusi luokka ja se perii). Katso ensin Testaaja-luokkaan.
            // TulostaTestiraportti(t);
        }

        static void TulostaTestiraportti(Testaaja t)
        {
            if (t.Testaa() == true) Console.WriteLine("TESTI ONNISTUI");
            else Console.WriteLine("TESTI EPÄONNISTUI");
        }
    }

 
}
