using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kotitehtava2
{
    class Tervehdys
    {
        public string tervehdys, uusiTervehdys;

        public Tervehdys(string terve)
        {
            tervehdys = terve;
        }

        public Tervehdys()
        {
            tervehdys = "";
            uusiTervehdys = "";
        }
        string Haetervehdys()
        {
            return tervehdys;
        }
        public void AsetaTervehdys(string t)
        {
            tervehdys = t;
        }
        string HaeuusiTervehdys()
        {
            return uusiTervehdys;
        }
        public void AsetaUusiTervehdys(string u)
        {
            uusiTervehdys = u;
        }
/*
        public void Tervehdi()
        {

        }
        */
        public void Tervehdi(string omaTervehdys)
        {
            tervehdys = omaTervehdys;
        }
        public string HaeTervehdys()
            {
                return $"{tervehdys}";
            }
        }
    }
