using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LuokatKotitehtava
{
    class Tervehtijä
    {
        private string tervehdys;
        private string v;

        public Tervehtijä(string v)
        {
            this.tervehdys = v;
        }

        public void AsetaTervehdys(string uusiTervehdys)
        {
            this.tervehdys = uusiTervehdys;

        }
        void tervehdi()
        {

        }
        void tervehdi(string omaTervehdys)
        {

        }
        public void AsetaTervehtijä(string t)
        {
            tervehdys = t;
        }
        public string HaeTervehdys()
            
        {
            return tervehdys;
        }
        public string HaeTervehtijä()
        {
            return $"{tervehdys}";
        }
    }
}
