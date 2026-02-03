using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EsimLuokat
{
    class Osa
    {
        // TEHT:tee tästä Property
        int luku; // jotain sisältöä

        public int Luku { get => luku; set => luku = value; }

        public string Tulosta()
        {
            return "O: "+Luku.ToString();
        }
    }
}
