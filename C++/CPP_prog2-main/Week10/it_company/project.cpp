#include "project.hh"
#include "date.hh"
#include <iostream>
#include <sstream>

Project::Project(const std::string& id, const std::string& start):
    id_(id), start_(start), closed_(false)
{
}

Project::Project(const std::string& id, const Date &start):
    id_(id), start_(start), closed_(false)
{
}

Project::~Project()
{
    //std::cout << "Project " << id_ << " destructed." << std::endl;
}

void Project::close(const Date& end)
{
    if(!end.is_default())
    {
    end_ = end;
    }
    else
    {
        end_ = Utils::today;

    }
    closed_ = true;
}

bool Project::is_closed() const
{
    return closed_;
}

bool Project::has_requirement(const std::string &requirement) const
{
    return requirements_.count(requirement) > 0;
}

void Project::add_requirement(const std::string &requirement)
{
    requirements_.insert(requirement);
    std::stringstream removedEmployees;

    for(auto it = assigned_employees_.begin(); it != assigned_employees_.end();)
    {
        Employee* employee = *it;
        bool hasMatchingSkill = false;
        for(const std::string& req : requirements_)
        {
            if(employee->has_skill(req))
            {
                hasMatchingSkill = true;
                break;
            }
        }
        if(!hasMatchingSkill)
        {

            removedEmployees << (removedEmployees.tellp() > 0 ? ", " : "") << employee->get_id();
            it = assigned_employees_.erase(it);
        }
        else
        {
            ++it;
        }
    }
    if(removedEmployees.tellp() > 0)
    {
        std::cout << NOT_QUALIFIED << removedEmployees.str() << std::endl;
    }
}

const std::set<std::string> &Project::get_requirements() const
{
    return requirements_;
}

void Project::assign_employee(Employee* employee)
{
    if(assigned_employees_.find(employee) == assigned_employees_.end())
    {
        assigned_employees_.insert(employee);
        //Update the assigned projects for the employee
        employee->assign_project(this);
    }
    else
    {
        for(const std::string& requirement : requirements_)
        {
            if(!employee->has_skill(requirement))
            {
                assigned_employees_.erase(employee);
                std::cout << "Employee " << employee->get_id() <<
                             " removed from project" << id_ <<
                             " due to a new requirement." << std::endl;
            }
        }
    }
}

const std::set<Employee *> &Project::get_assigned_employees() const
{
    return assigned_employees_;
}

bool Project::is_employee_assigned( Employee *employee) const
{
    return assigned_employees_.find(employee) != assigned_employees_.end();
}

