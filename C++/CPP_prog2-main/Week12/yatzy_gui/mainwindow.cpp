/* Yatzy GUI projekti
 *
 * Kuvaus:
 *   Ohjelma toteuttaa yatzy-pelin. Pelissä on mahdollista valita pelaajamäärä
 *   spinboxin avulla. Kun pelaajamäärä on asetettu, klikataan confirm (vahvistus)
 *   painiketta. Tämän jälkeen peli lähtee käyntiin. Kullakin pelaajalla on 3
 *   mahdollisuutta heittää noppia uudestaan. Pelissä voi lukita tietyn numeron
 *   kohdalta, jos ei halua sen vaihtuvan. Jos haluaa pitää kaikki, sitten lukitaan
 *   tietysti kaikki numerot. Peli päättyy kun kaikki ovat käyttäneet noppien
 *   heittomäärät ja voittaja julkaistaan. Peli on mahdollista myös aloittaa
 *   uudestaan reset painikkeella.
 *
 * Ohjelman kirjoittaja
 * Nimi: Jeremi Andersin
 * Opiskelijanumero: 151965638
 * Käyttäjätunnus: sdjean ( Git-repositorion hakemistonimi. )
 * E-Mail: jeremi.andersin@tuni.fi
 *
 * Huomioita ohjelmasta ja sen toteutuksesta (jos sellaisia on):
 *  Käytetään pohjakoodina functions ja gameengine -luokkia. Gameengine luokkaan
 *  on tehty muutoksia.
 * */

#include "gameengine.hh"
#include "functions.hh"
#include "mainwindow.hh"
#include "ui_mainwindow.h"
#include "iostream"
#include "sstream"

GameEngine gameEngine;
const int TimerIntervalMs = 1000;

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)

{
    ui->setupUi(this);

    connect(ui->confirmButton, &QPushButton::clicked, this, &MainWindow::onConfirmButtonClicked);
    connect(ui->turnButton, &QPushButton::clicked, this, &MainWindow::onTurnButtonClicked);
    connect(ui->closeButton, &QPushButton::clicked, this, &MainWindow::onCloseButtonClicked);
    connect(ui->rollButton, &QPushButton::clicked, this, &MainWindow::onRollButtonClicked);
    connect(ui->resetButton, &QPushButton::clicked, this, &MainWindow::onResetButtonClicked);

    connect(ui->checkBox_1, &QCheckBox::stateChanged, this, &MainWindow::onCheckBoxStateChanged);
    connect(ui->checkBox_2, &QCheckBox::stateChanged, this, &MainWindow::onCheckBoxStateChanged);
    connect(ui->checkBox_3, &QCheckBox::stateChanged, this, &MainWindow::onCheckBoxStateChanged);
    connect(ui->checkBox_4, &QCheckBox::stateChanged, this, &MainWindow::onCheckBoxStateChanged);
    connect(ui->checkBox_5, &QCheckBox::stateChanged, this, &MainWindow::onCheckBoxStateChanged);

    timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &MainWindow::onSecTimer);
    //TODO:
    //Ajastin näyttämään peliin kulunut aika. ***
    //Numeroiden päivitys oikein kun vaihtaa vuoroa pelaajalta toiselle?
    //Koodin siistiminen.

    //Pelin toiminnallisuus pitää määritellä ja dokumentoida.
    //Dokumentin pitää sisältää käyttöohjeet pelin pelaamiseen,
    //esimerkiksi millaisia riippuvuuksia eri toiminnoilla on.
    //Dokumentista pitää tulla ilmi, mitä tapahtuu ja mitä voi tapahtua eri tilanteissa.
    //Dokumentissa pitää kuvata myös ohjelman rakenne ja tehdyt suunnittelupäätökset.
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::onSecTimer()
{
    int seconds = ui->lcdNumberSec->intValue();

    ++seconds;

    ui->lcdNumberSec->display(seconds);
}

void MainWindow::onConfirmButtonClicked()
{
    qDebug() << "Debugging";

    timer->start(TimerIntervalMs);
    int numberOfPlayers = ui->playerSpinBox->value();

    gameEngine.clear_players();

    for(int i = 0; i < numberOfPlayers; ++i)
    {
        Player newPlayer;
        newPlayer.id_ = i + 1; //+ 1
        newPlayer.rolls_left_ = INITIAL_NUMBER_OF_ROLLS;
        gameEngine.add_player(newPlayer);
    }

    updateGuideText();
}


void MainWindow::onCloseButtonClicked()
{
    close();
}

void updateDiceLabel(QLabel* label, int value)
{
    label->setText(QString::number(value));
}

void MainWindow::onRollButtonClicked()
{

    if(gameEngine.getCurrentPlayerRollsLeft() == 0)
    {
        ui->infoTextBrowser->setText("No more rolls left");
        return;
    }

    gameEngine.roll();
    const std::vector<int>& diceValues = gameEngine.get_latest_dice_values();

    std::string resultText;
    int resultType = construe_result(diceValues, resultText);
    qDebug() << "Result type: " << resultType;

    updateDiceLabel(ui->diceLabel_1, diceValues[0]);
    updateDiceLabel(ui->diceLabel_2, diceValues[1]);
    updateDiceLabel(ui->diceLabel_3, diceValues[2]);
    updateDiceLabel(ui->diceLabel_4, diceValues[3]);
    updateDiceLabel(ui->diceLabel_5, diceValues[4]);

    ui->infoTextBrowser->setText(QString::fromStdString(resultText));

    updateGuideText();

    if(gameEngine.getCurrentPlayerRollsLeft() == 0)
    {
        ui->turnTextBrowser->append(QString::fromStdString(
                                        "Turn of " + std::to_string(gameEngine.getCurrentPlayerId()) + " has ended!"));
    }

    if(gameEngine.is_game_over())
    {
        timer->stop();
        ui->turnTextBrowser->clear();
        string winnerText = gameEngine.get_winner_info();
        ui->turnTextBrowser->append(QString::fromStdString(winnerText));
        //return;
    }
}


void MainWindow::onTurnButtonClicked()
{
    if(!gameEngine.is_game_over() && !gameEngine.getPlayers().empty())
    {

        ui->diceLabel_1->clear();
        ui->diceLabel_2->clear();
        ui->diceLabel_3->clear();
        ui->diceLabel_4->clear();
        ui->diceLabel_5->clear();

        gameEngine.give_turn();
        updateGuideText();

        ui->checkBox_1->setChecked(false);
        ui->checkBox_2->setChecked(false);
        ui->checkBox_3->setChecked(false);
        ui->checkBox_4->setChecked(false);
        ui->checkBox_5->setChecked(false);

        gameEngine.reset_latest_dice_values();
        const std::vector<int>& diceValues = gameEngine.get_latest_dice_values();
        updateDiceLabel(ui->diceLabel_1, diceValues[0]);
        updateDiceLabel(ui->diceLabel_2, diceValues[1]);
        updateDiceLabel(ui->diceLabel_3, diceValues[2]);
        updateDiceLabel(ui->diceLabel_4, diceValues[3]);
        updateDiceLabel(ui->diceLabel_5, diceValues[4]);

    }
}

void MainWindow::onResetButtonClicked()
{
    timer->stop();
    ui->lcdNumberSec->display(0);

    ui->infoTextBrowser->clear();
    ui->turnTextBrowser->clear();

    ui->playerSpinBox->setValue(0);

    ui->checkBox_1->setChecked(false);
    ui->checkBox_2->setChecked(false);
    ui->checkBox_3->setChecked(false);
    ui->checkBox_4->setChecked(false);
    ui->checkBox_5->setChecked(false);

    ui->diceLabel_1->clear();
    ui->diceLabel_2->clear();
    ui->diceLabel_3->clear();
    ui->diceLabel_4->clear();
    ui->diceLabel_5->clear();

    gameEngine.clear_players();
    gameEngine.reset_game();
    updateGuideText();
}

void MainWindow::updateGuideText()
{
    ui->turnTextBrowser->clear();
    std::ostringstream guideStream;
    gameEngine.update_guide(guideStream);
    ui->turnTextBrowser->append(QString::fromStdString(guideStream.str()));
}

void MainWindow::onCheckBoxStateChanged(int state)
{
    QCheckBox* checkBox = qobject_cast<QCheckBox*>(sender());
    if(!checkBox)
        return;

    int index = checkBox->objectName().mid(9).toInt() - 1;
    gameEngine.setDiceLockState(index, state == Qt::Checked);
}
