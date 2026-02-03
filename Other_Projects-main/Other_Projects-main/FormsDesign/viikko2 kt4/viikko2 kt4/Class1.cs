using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace viikko2_kt4
{
    public class Class1
    {
        private string _smth;
        public Class1(string smth)
        {
            this._smth = smth;
        }
        public string Someth_property
        {
            get { return _smth; }
        }
    }
}

