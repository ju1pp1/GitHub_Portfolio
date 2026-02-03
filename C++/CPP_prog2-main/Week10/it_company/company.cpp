#include "company.hh"
#include "utils.hh"
#include <iostream>
#include <set>
#include <memory>
#include <iterator>
#include <algorithm>

Company::Company()
{
}

Company::~Company()
{
    //std::cout << "Company destructor" << std::endl;

    // TODO: Deallocate staff
    for(std::map<std::string, Employee*>::iterator
        iter = all_staff_.begin();
        iter != all_staff_.end();
        ++iter)
    {
        delete iter->second;
    }
    // TODO: Deallocate projects
    for (auto& project : created_projects_) {
        delete project;
    }
}

void Company::set_date(Params params)
{
    std::string day = params.at(0);
    std::string month = params.at(1);
    std::string year = params.at(2);
    if( not Utils::is_numeric(day, false) or
        not Utils::is_numeric(month, false) or
        not Utils::is_numeric(year, false) )
    {
        std::cout << NOT_NUMERIC << std::endl;
        return;
    }
    Utils::today.set(stoi(day), stoi(month), stoi(year));
    std::cout << "Date has been set to ";
    Utils::today.print();
    std::cout << std::endl;
}

void Company::advance_date(Params params)
{
    std::string amount = params.at(0);
    if( not Utils::is_numeric(amount, true) )
    {
        std::cout << NOT_NUMERIC << std::endl;
        return;
    }
    Utils::today.advance(stoi(amount));
    std::cout << "New date is ";
    Utils::today.print();
    std::cout << std::endl;
}

void Company::recruit(Params params)
{
    std::string employee_id = params.at(0);
    std::map<std::string, Employee*>::const_iterator
            iter = current_staff_.find(employee_id);

    if( iter != current_staff_.end() )
    {
        std::cout << ALREADY_EXISTS << employee_id << std::endl;
        return;
    }

    iter = all_staff_.find(employee_id);
    if( iter != all_staff_.end() )
    {
        current_staff_.insert(*iter);
        std::cout << EMPLOYEE_RECRUITED << std::endl;
        return;
    }

    Employee* new_employee = new Employee(employee_id);
    all_staff_.insert({employee_id, new_employee});
    current_staff_.insert({employee_id, new_employee});
    std::cout << EMPLOYEE_RECRUITED << std::endl;
}

void Company::leave(Params params)
{
    std::string employee_id = params.at(0);
    std::map<std::string, Employee*>::const_iterator
            iter = current_staff_.find(employee_id);
    if( iter == current_staff_.end() )
    {
        std::cout << CANT_FIND << employee_id << std::endl;
        return;
    }

    current_staff_.erase(iter); // Employee still stays in all_staff_
    std::cout << EMPLOYEE_LEFT << std::endl;
}

void Company::add_skill(Params params)
{
    std::string employee_id = params.at(0);
    std::string skill_name = params.at(1);

    std::map<std::string, Employee*>::const_iterator
            staff_iter = current_staff_.find(employee_id);
    if( staff_iter == current_staff_.end() )
    {
        std::cout << CANT_FIND << employee_id << std::endl;
        return;
    }

    staff_iter->second->add_skill(skill_name);
    std::cout << SKILL_ADDED << employee_id << std::endl;
}

void Company::print_current_staff(Params)
{
    if( current_staff_.empty() )
    {
        std::cout << "None" << std::endl;
        return;
    }

    for( auto employee : current_staff_ )
    {
        employee.second->print_id("");
        std::cout << std::endl;
    }
}

void Company::create_project(Params params)
{   
    std::string project_id = params.at(0);

    if(current_projects_.find(project_id) != current_projects_.end() )
    {
        std::cout << ALREADY_EXISTS << project_id << std::endl;
        return;
    }

    auto iter = alltime_projects_.find(project_id);
    if( iter != alltime_projects_.end() )
    {
        //Added vector to store new data.
        Project* new_project = new Project(project_id, Utils::today);
        current_projects_.insert({project_id, new_project});
        created_projects_.push_back(new_project);
        std::cout << PROJECT_CREATED << std::endl;
        return;
    }
    Project* new_project = new Project(project_id, Utils::today);
    alltime_projects_.insert({project_id, new_project});
    current_projects_.insert({project_id, new_project});
    created_projects_.push_back(new_project);
    std::cout << PROJECT_CREATED << std::endl;
}

void Company::close_project(Params params)
{
 std::string project_id = params.at(0);
 auto iter = current_projects_.find(project_id);

 if(iter == current_projects_.end())
 {
     std::cout << CANT_FIND << project_id << std::endl;
     return;
 }

 Project* project = iter->second;

 if(project->is_closed())
 {
     std::cout << PROJECT_CLOSED << std::endl; //<< project_id
 }
 else
 {
     project->close(Utils::today);
     std::cout << PROJECT_CLOSED << std::endl; //<< project_id
 }
}

void Company::print_projects(Params)
{
    //Using the vector to check and print.
 if(created_projects_.empty())
 {
     std::cout << "None" << std::endl;
     return;
 }
 for(const Project* project : created_projects_)
 {
     //const Project* project = entry.second;
     std::cout << project->get_id(); //"Project ID: " << | << std::endl
     //std::cout << "Start Date: ";
     std::cout << " : ";
     project->get_start_date().print();
     std::cout << " - "; //std::endl

     if(project->is_closed())
     {
         //std::cout << "End date: ";
         project->get_end_date().print();
         //std::cout << std:: endl;
     }
     std::cout << std::endl;
 }
}

void Company::add_requirement(Params params)
{
    if(params.size() < 2)
    {
        std::cout << "Error" << std::endl;
        return;
    }
    std::string project_id = params.at(0);
    std::string requirement = params.at(1);

    auto project_iter = current_projects_.find(project_id);
    if(project_iter == current_projects_.end())
    {
        std::cout << CANT_FIND << project_id << std::endl;
        return;
    }
    Project* project = project_iter->second;

    if(project->is_closed())
    {
        std::cout << CANT_FIND << project_id << std::endl;
        return;
    }

    if(project->has_requirement(requirement))
    {
        std::cout << "Requirement added for: " << project_id << std::endl;
        //std::cout << "Requirement already exists for project: " << project_id << std::endl;
    }
    else
    {
        project->add_requirement(requirement);
        std::cout << "Requirement added for: " << project_id << std::endl;
    }
}

void Company::assign(Params params)
{
    if(params.size() < 2)
    {
        std::cout << "Insufficient parameters for assign." << std::endl;
        return;
    }
    std::string employee_id = params.at(0);
    std::string project_id = params.at(1);

    auto employee_iter = current_staff_.find(employee_id);
    auto project_iter = current_projects_.find(project_id);

    if(employee_iter == current_staff_.end())
    {
        std::cout << CANT_FIND << employee_id << std::endl;
        return;
    }
    if(project_iter == current_projects_.end())
    {
        std::cout << CANT_FIND << project_id << std::endl;
        return;
    }
    Employee* employee = employee_iter->second;
    Project* project = project_iter->second;

    if(project->is_closed())
    {
        std::cout << CANT_ASSIGN << employee->get_id() << std::endl;
        return;
    }
    //CHECK IF already assigned
    if(project->is_employee_assigned(employee))
    {
        std::cout << CANT_ASSIGN << employee_id << std::endl;
        return;
    }

    if(!project->get_requirements().empty())
    {
        bool has_matching_skill = false;
        for(const std::string& requirement : project->get_requirements())
        {
            if(employee->has_skill(requirement))
            {
                has_matching_skill = true;
                break;
            }
        }
        if(!has_matching_skill)
        {
            //std::cout << "Employee does not have the required skills for project: " << project_id << std::endl;
            std::cout << CANT_ASSIGN << employee_id << std::endl;
            return;
        }
    }
    project->assign_employee(employee);
    //std::cout << "Employee " << employee_id << " assigned to project " << project_id << std::endl;
    std::cout << "Staff assigned for: " << project_id << std::endl;
}

void Company::print_project_info(Params params)
{
    if(params.size() < 1)
    {
        std::cout << "Insufficient parameters" << std::endl;
        return;
    }
    std::string project_id = params.at(0);
    auto project_iter = current_projects_.find(project_id);

    if(project_iter == current_projects_.end())
    {
        std::cout << CANT_FIND << project_id << std::endl;
        return;
    }
    const Project* project = project_iter->second;
    //std::cout << "Project ID: " << project->get_id() << std::endl;
    std::cout << project->get_id();
    std::cout << " : ";
    project->get_start_date().print();
    std::cout << " - ";


    if(project->is_closed())
    {
        //std::cout << "End date: ";
        project->get_end_date().print();
        //std::cout << std::endl;
    }
    std::cout << std::endl;

    const auto& requirements = project->get_requirements();
    std::cout << "** Requirements: ";
    if(!requirements.empty())
    {
        bool firstRequirement = true;
        for(const std::string& req : requirements)
        {
            if(!firstRequirement)
            {
                std::cout << ", ";
            }
            std::cout << req;
            firstRequirement = false;
        }
        /*
        std::vector<std::string> sorted_requirements(requirements.begin(), requirements.end());
        std::sort(sorted_requirements.begin(), sorted_requirements.end());
        std::copy(sorted_requirements.begin(), sorted_requirements.end(),
                  std::ostream_iterator<std::string>(std::cout, ", "));
        std::cout << "\b\b";
        */
    }
    else
    {
        std::cout << "None";
    }
    std::cout << std::endl;

    const auto& assigned_employees = project->get_assigned_employees();
    std::cout << "** Staff: ";
    if(!assigned_employees.empty())
    {
        bool firstEmployee = true;
        for(const Employee* employee : assigned_employees)
        {
            if(!firstEmployee)
            {
                std::cout << ", ";
            }
            std::cout << employee->get_id();
            firstEmployee = false;
        }
        /*
        std::vector<std::string> employee_ids;
        for(const Employee* employee : assigned_employees)
        {
            employee_ids.push_back(employee->get_id());
        }
        std::sort(employee_ids.begin(), employee_ids.end());
        std::copy(employee_ids.begin(), employee_ids.end(),
                  std::ostream_iterator<std::string>(std::cout, ", "));
        std::cout << "\b\b"; */
    }
    else
    {
        std::cout << "None";
    }
    std::cout << std::endl;

}

void Company::print_employee_info(Params params)
{
    if(params.size() < 1)
    {
        std::cout << "Insufficient parameters." << std::endl;
        return;
    }
    std::string employee_id = params.at(0);
    auto employee_iter = current_staff_.find(employee_id);

    if(employee_iter == current_staff_.end())
    {
        std::cout << CANT_FIND << employee_id << std::endl;
        return;
    }

    const Employee* employee = employee_iter->second;
    const auto& skills = employee->get_skills();
    std::cout << "Skills: ";
    if(!skills.empty())
    {
        bool firstSKill = true;

        for(const std::string& skill : skills)
        {
            if(!firstSKill)
            {
                std::cout << ", ";
            }
            std::cout << skill;
            firstSKill = false;
        }

        /*
        std::vector<std::string> sortedSkills(skills.begin(), skills.end());
        std::sort(sortedSkills.begin(), sortedSkills.end());
        std::copy(sortedSkills.begin(), sortedSkills.end(),
                  std::ostream_iterator<std::string>(std::cout, ", "));
        std::cout << "\b\b"; */
    }
    else
    {
        std::cout << "None";
    }
    std::cout << std::endl;

    const auto& assignedProjects = employee->get_assigned_projects();
    std::cout << "Projects: "; //<< std::endl
    if(!assignedProjects.empty())
    {
        std::cout << std::endl;
        for(const Project* project : assignedProjects)
        {
            //std::cout << std::endl;
            std::cout << "** ";
            std::cout << project->get_id() << " : ";
            project->get_start_date().print();
            std::cout << " - ";

            if(project->is_closed())
            {

                project->get_end_date().print();
            }
            std::cout << std::endl;
        }
    }
    else
    {
        std::cout << "None" << std::endl;
    }
    //std::cout << std::endl;
}

void Company::print_active_staff(Params)
{
    std::set<std::string> uniqueEmployeeIDs;

    //std::vector<const Employee*> activeEmployees;
    for(const auto& project : current_projects_)
    {
        const auto& assignedEmployees = project.second->get_assigned_employees();
        for(const Employee* employee : assignedEmployees)
        {
            uniqueEmployeeIDs.insert(employee->get_id());
        }
        //activeEmployees.insert(activeEmployees.end(), assignedEmployees.begin(), assignedEmployees.end());
    }
    /*
    std::sort(activeEmployees.begin(), activeEmployees.end(),
              [](const Employee* a, const Employee* b) {
        return a->get_id() < b->get_id();
    });*/
    if(!uniqueEmployeeIDs.empty())
    {
        for(const std::string& employeeId : uniqueEmployeeIDs)
        {
            std::cout << employeeId << std::endl;
        }
    }
    else
    {
        std::cout << "None" << std::endl;
    }
}
