using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PersonLibrary;

namespace Personi
{
    class MyPersonList : PersonList  //Peritään luoka PersonList -tiedot
    {
        public override void Add(PersonPlus person)
        {
            if (person.Age >= 18)
            {
                base.Add(person);
            }
        }


        public override PersonPlus GetAt(int index)
        {

            if (base.GetAt(index).Age >= 20)
            {
                return base.GetAt(index);
            }

            else { return null; }
        }

        public override string ToString()
        {
            string mm = "Listaan henkilöt: \n";
            foreach (PersonPlus person in personList)
            {
                mm = person.Tulosta() + " - ";

            }
            return mm; 
        }
    }
}

    

