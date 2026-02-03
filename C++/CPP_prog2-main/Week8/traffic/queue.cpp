#include "queue.hh"
#include <iostream>
#include <string>

// Implement the member functions of Queue here


Queue::Queue(unsigned int cycle)
{
    cycle_ = cycle;
}


Queue::~Queue()
{

}

void Queue::enqueue(const string &reg)
{

    if(is_green_)
    {
        auto* new_vehicle_instadelete = new Vehicle{reg, nullptr};
        new_vehicle_instadelete->next = first_;
        cout << (is_green_ ? "GREEN: " : "RED: ") << "The vehicle " << new_vehicle_instadelete->reg_num <<" need not stop to wait" << endl;
        return;
    }
    auto* new_vehicle = new Vehicle{reg, nullptr};
    if(!isEmpty())
    {
        new_vehicle->next = first_;
    }

    first_ = new_vehicle;
}

void Queue::switch_light()
{
    is_green_ = !is_green_;

    if(isEmpty())
    {
        cout << (is_green_ ? "GREEN: " : "RED: ") << "No vehicles waiting in traffic lights" << endl;
        return;
    }
    cout << (is_green_ ? "GREEN: " : "RED: ") << "Vehicle(s) " ;

    int vehiclesToPass = cycle_;

    reverse_order();

    Vehicle* current = first_;

    while (vehiclesToPass > 0 && current) {
           cout << current->reg_num << " ";
           Vehicle* toDequeue = current;
           current = current->next;
           delete toDequeue;
           vehiclesToPass--;
       }

       first_ = current;

    cout << "can go on" << endl;
    is_green_ = false;

}
void Queue::printLastThreeReverse(Vehicle* current)
{
    if(current)
    {
        printLastThreeReverse(current->next);
        cout << current->reg_num << " ";
    }
}

void Queue::reverse_order()
{
    if(isEmpty() || first_->next == nullptr)
    {
        return;
    }
    Vehicle* prev = nullptr;
    Vehicle* current = first_;
    Vehicle* next = nullptr;
    while(current != nullptr)
    {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    first_ = prev;
}

void Queue::reset_cycle(unsigned int cycle)
{
    cycle_ = cycle;
}

void Queue::print() const
{

    if(isEmpty())
    {
        cout << (is_green_ ? "GREEN: " : "RED: ") << "No vehicles waiting in traffic lights" << endl;
        return;
    }
    cout << (is_green_ ? "GREEN: " : "RED: ") << "Vehicle(s) ";
    printReverse(first_);
    cout << "waiting in traffic lights" << endl;

}
bool Queue::isEmpty() const
{
    return first_ == nullptr;
}

void Queue::printReverse(Vehicle* current) const
{
    if (current == nullptr)
    {
        return;
    }
    printReverse(current->next);
    cout << current->reg_num << " ";
}
