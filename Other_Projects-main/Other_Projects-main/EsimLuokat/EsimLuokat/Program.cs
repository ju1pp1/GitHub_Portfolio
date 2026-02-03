using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EsimLuokat
{
    class Program
    {
        static void Main(string[] args)
        {
            Kokonaisuus kok = new Kokonaisuus();
            Osa osa = new Osa();
            osa.Luku = 42;
            kok.LisääOsa(osa);
            // tee toinen Osa
            Osa vOsa = new Osa();
            vOsa.Luku = 21; // anna arvo Luku:lle
            // ja lisää varaosa
            kok.LisääVaraOsa(vOsa);

            // tulosta
            Console.WriteLine( osa.Tulosta());
            Console.WriteLine(vOsa.Tulosta());
            Console.WriteLine( kok.Tulosta());
        }
    }
}
