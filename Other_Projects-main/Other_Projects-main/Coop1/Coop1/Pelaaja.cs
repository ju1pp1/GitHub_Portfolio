using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coop1
{
    class Pelaaja
    {
        string alias;
        int pisteet;
        //ctor<tab>
        public Pelaaja()
        {

        }
        public string Alias { get => alias; set => alias = value; }
        public int Pisteet { get => pisteet; set => pisteet = value; }
    }
}
