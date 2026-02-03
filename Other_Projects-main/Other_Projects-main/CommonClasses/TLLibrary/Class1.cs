using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TLLibrary
{
    /// <summary>
    /// Testiluokka yleiskäyttöön
    /// </summary>
    public class Class1
    {
        int numero;
        /// <summary>
        /// Numero, luettaessa yhtä suurempi
        /// </summary>
        public int Numero
        {
            get => numero+1;
            set => numero = value;
        }

        /// <summary>
        /// Tulostaa
        /// </summary>
        /// <returns>Tulostettava teksti</returns>
        public string Tulosta()
        {
            return $"It Works! Numero={Numero}";
        }
    }
}
